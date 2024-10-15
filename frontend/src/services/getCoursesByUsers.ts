import { ApiProvider } from "@/api/ApiProvider";

export type TGetCoursesByUsers = {
    id: number;
    name: string;
    description: string;
    code: string;
    durationTime: number;
    courseSyllabus: string;
    price: number;
    courseImage: string;
};

export const getCoursesByUsers = async (userId: string): Promise<TGetCoursesByUsers[]> => {
    try {
        const apiProvider = new ApiProvider();

        const response = await apiProvider.get(`/users/${userId}/courses/`);

        return response.data;
    } catch (error) {
        throw error;
    }
}