'use client'

import LoggedLayout from "@/components/loggedLayout/page"
import { getCoursesByUsers, TGetCoursesByUsers } from "@/services/getCoursesByUsers";
import { unsubscribeCourse} from "@/services/unsubscribeCourse";
import { useEffect, useState } from "react";

export default function MeusCursos() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if(!user.id){
    window.location.href = "/login";
  }

  const [courses, setCourses] = useState<TGetCoursesByUsers[]>([]);

  const getCourses = async () => {
    try {
      const response = await getCoursesByUsers(user.id);
      setCourses(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handlerUnsubscribeCourse = async (courseId: string) => {
    try {
      const response = await unsubscribeCourse(user.id, courseId);

      if(response.isUnsubscribed){
        alert("Você foi desmatriculado com sucesso");

        getCourses();
      }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <LoggedLayout>
      <div className="flex flex-col w-full h-full p-8 overflow-scroll">
        <h1 className="text-3xl">Meus cursos</h1>

        <div className="pt-2 mt-2 border-t-2 border-gray-800">
          <ul className="grid grid-cols-3">
            {courses.map((course) => (
              <li
              key={course.id}
              className="flex flex-col justify-between bg-white w-96 p-4 m-2 rounded-lg shadow-2xl">
              <h2 className="text-xl">
                {" "}
                {course.code} - {course.name}
              </h2>
              <p className="text-gray-600">
                Descrição do curso {course.description}
              </p>
              <p className="text-gray-600">Duração: {course.durationTime}H</p>

              <button
              onClick={() => handlerUnsubscribeCourse(course.id.toString())}
              className="bg-red-800 hover:bg-red-900 text-white rounded-lg p-2 mt-2">
              Desmatricular-se
              </button>

            </li>
            ))}
          </ul>
        </div>
      </div>
    </LoggedLayout>
  )
}