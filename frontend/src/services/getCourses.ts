import { ApiProvider } from "@/api/ApiProvider";

export type TGetCoursesResponse = {
    id: number;
    code: string;
    name: string;
    description: string;
    durationTime: number;
    courseSyllabus: string;
    price: number;
    courseImage: string;
}[];

export const getCourses = async (): Promise<TGetCoursesResponse> => {
    try {
        const apiProvider = new ApiProvider();

        const response = await apiProvider.get("/courses");

        return response.data;
    } catch (error) {
        throw new Error("Erro na busca de cursos");
    }
}