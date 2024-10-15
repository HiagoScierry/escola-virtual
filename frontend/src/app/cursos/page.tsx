"use client";
import LoggedLayout from "@/components/loggedLayout/page";
import { createCourse, TCreateCourseRequest } from "@/services/createCourse";
import { getCourses, TGetCoursesResponse } from "@/services/getCourses";
import { LoginResponse } from "@/services/makeLogin";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { z } from "zod";

const saveCourseSchema = z.object({
  code: z.string().max(6),
  name: z.string(),
  description: z.string().min(1),
  durationTime: z.number(),
  courseSyllabus: z.string().min(1),
  price: z.number().positive(),
  courseImage: z.string().url(),
});

export default function Cursos() {
  const user: LoginResponse = JSON.parse(localStorage.getItem("user") || "{}");

  if(!user.id) {
    window.location.href = "/login";
  }

  const isAdmin = user ? user.isAdmin : false;


  const [form, setForm] = useState<TCreateCourseRequest>({
    code: "",
    name: "",
    description: "",
    durationTime: 0,
    courseSyllabus: "",
    price: 0,
    courseImage: "",
  })

  const [courses, setCourses] = useState<TGetCoursesResponse>([]);


  const saveCourse = async () => {
    try {
      console.log(form);

      const data = saveCourseSchema.parse(form);

      const response = await createCourse(data);

      if(response.status === 201) {
        setForm({
          code: "",
          name: "",
          description: "",
          durationTime: 0,
          courseSyllabus: "",
          price: 0,
          courseImage: "",
        })

        await setCoursesInVariable();
      }

    } catch (error) {
      // @ts-ignore
      console.log(error.errors);
      // @ts-ignore
      const errosString = error.errors.map((err: any) => {
        return err.message;
      }).join("\n");

      alert("Preencha todos os campos corretamente");
    }
  };

  const subscribeCourse = async (userId: string, courseId: string) => {
    try {
      const response = await fetch(`/users/${userId}/course/${courseId}/subscribe/`, {
        method: "POST",
      });

      if(response.status === 200) {
        alert("Matriculado com sucesso!");
      } else {
        alert("Erro ao matricular");
      }

    } catch (error) {
      console.log(error);
    }
  }

  const setCoursesInVariable = async () => {
    getCourses().then((data) => {
      setCourses(data);
    });
  };

  useEffect(() => {
    setCoursesInVariable();
  }, []);

  return (
    <LoggedLayout>
      <div className="flex flex-col w-full h-full p-8 overflow-scroll">
        <h1 className="text-3xl">Cursos</h1>
        {
          isAdmin && (
            <div className="pt-2 border-t-2 border-gray-800">
            <form>
              <div className="space-y-12">
                <div className="pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Cadastre um novo curso
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-1">
                        <label
                          htmlFor="course-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nome do Curso
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-900 sm:max-w-md">
                            <input
                              id="course-name"
                              name="course-name"
                              type="text"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              placeholder="Tópicos de programação"
                              autoComplete="course-name"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="course-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Código do Curso
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-900 sm:max-w-md">
                            <input
                              id="course-code"
                              name="course-code"
                              type="text"
                              max={6}
                              value={form.code}
                              onChange={(e) => setForm({ ...form, code: e.target.value })}
                              placeholder="COM123"
                              autoComplete="course-code"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="course-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Duração do Curso (em horas)
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-900 sm:max-w-md">
                            <input
                              id="course-duration"
                              name="course-duration"
                              type="number"
                              value={form.durationTime}
                              onChange={(e) => setForm({ ...form, durationTime: parseInt(e.target.value) })}
                              placeholder="30, 40, 60"
                              autoComplete="course-duration"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="course-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Preço do Curso (Em Reais)
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-900 sm:max-w-md">
                            <input
                              id="course-name"
                              name="course-name"
                              type="number"
                              placeholder="R$ 100"
                              value={form.price}
                              onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })}
                              autoComplete="course-name"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="course-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Imagem do Curso
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-900 sm:max-w-md">
                            <input
                              id="course-image"
                              name="course-imege"
                              type="text"
                              value={form.courseImage}
                              onChange={(e) => setForm({ ...form, courseImage: e.target.value })}
                              placeholder="https://example.com/image.jpg"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="course-description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Descrição
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="course-description"
                          name="course-description"
                          rows={3}
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 p-2"
                          defaultValue={""}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Ementa
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="course-syllabus"
                          name="course-syllabus"
                          rows={3}
                          value={form.courseSyllabus}
                          onChange={(e) => setForm({ ...form, courseSyllabus: e.target.value })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900 sm:text-sm sm:leading-6 p-2"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveCourse()}
                  type="button"
                  className="rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          )
        }

        <div className="pt-2 mt-2 border-t-2 border-gray-800">
          <h2 className="text-2xl">Cursos disponíveis</h2>
          <ul className="grid grid-cols-3">
            {courses.map((course) => (
              <li
                key={course.id}
                className="flex flex-col justify-between bg-white w-96 p-4 m-2 rounded-lg shadow-2xl"
              >
                <h2 className="text-xl">
                  {" "}
                  {course.code} - {course.name}
                </h2>
                <p className="text-gray-600">
                  Descrição do curso {course.description}
                </p>
                <p className="text-gray-600">Duração: {course.durationTime}H</p>

                <button
                onClick={() => subscribeCourse(user.id.toString(), course.id.toString())}
                className="bg-sky-800 hover:bg-sky-900 text-white rounded-lg p-2 mt-2">
                  Matricular
                </button>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </LoggedLayout>
  );
}
