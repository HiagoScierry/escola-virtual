import { ApiProvider } from "@/api/ApiProvider"

export type SubscribeCourseResponse = {
    isSubscribed: boolean;
    message: string;
}

export const subscribeCourse = async (userId: string,courseId: string): Promise<SubscribeCourseResponse> => {
    try {
        const apiProvider = new ApiProvider();

        const response = await apiProvider.post(`/users/${userId}/course/${courseId}/subscribe/`, {});

        return response.data;
    } catch (error) {
        throw error;
    }
}