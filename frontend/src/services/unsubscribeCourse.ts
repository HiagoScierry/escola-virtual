import { ApiProvider } from "@/api/ApiProvider"

export type TUnsubscribeCourseResponse = {
    message: string;
    isUnsubscribed: boolean;
}


export const unsubscribeCourse = async (userId: string,courseId: string): Promise<TUnsubscribeCourseResponse>=> {
    try {
        const apiProvider = new ApiProvider();

        const response = await apiProvider.post(`/users/${userId}/course/${courseId}/unsubscribe/`, {});

        return response.data;
    } catch (error) {
        throw error;
    }
}