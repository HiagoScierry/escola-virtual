import { ApiProvider } from "@/api/ApiProvider";
import { AxiosResponse } from "axios";

export type TCreateCourseRequest = {
    code: string;
    name: string;
    description: string;
    durationTime: number;
    courseSyllabus: string;
    price: number;
    courseImage: string;
};

export const createCourse = async (data: TCreateCourseRequest): Promise<AxiosResponse> => {
    try {
        const apiProvider = new ApiProvider();

        const response = await apiProvider.post("/courses", data);

        return response;
    } catch (error) {
        throw new Error("Erro ao criar um curso");
    }
};