import { ApiProvider } from "@/api/ApiProvider";

export type LoginResponse = {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;

};

export const makeLogin = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const apiProvider = new ApiProvider();
        
        const response = await apiProvider.post("/auth", {
            email,
            password
        });

        return response.data.user;
    } catch (error) {
        console.error(error);
    }

    throw new Error("Login failed"); // Add a return statement at the end of the function
};