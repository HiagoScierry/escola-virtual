import { PrismaClient, User } from "@prisma/client";
import { IUserService } from "./intefaces/IUserService";

export class UserService implements IUserService {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async list(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
}