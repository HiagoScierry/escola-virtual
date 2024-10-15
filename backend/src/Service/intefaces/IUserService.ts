import { User } from "@prisma/client";

export interface IUserService {
    list(): Promise<User[]>;
}