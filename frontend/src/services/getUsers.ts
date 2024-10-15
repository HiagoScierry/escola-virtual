import { ApiProvider } from "@/api/ApiProvider"
import { th } from "@faker-js/faker";

export type TGetUsersResponse = {
    id: number;
    email: string;
    name: string;
    password: string;
    isAdmin: boolean;
}[];

export const getUsers = async (): Promise<TGetUsersResponse> => {
    try {
        const apiProvider = new ApiProvider();

        const response = await apiProvider.get("/users");

        return response.data;

    } catch (error) {
        throw new Error("Erro na busca de usuários");
    }

    return []; // add a return statement at the end
}