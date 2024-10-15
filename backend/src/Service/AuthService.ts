import { PrismaClient, User } from "@prisma/client";
import { IAuthService } from "./intefaces/IAuthService";

export class AuthService implements IAuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user === null || user === undefined) {
      throw Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid credentials");
    }

    return user;
  }
}
