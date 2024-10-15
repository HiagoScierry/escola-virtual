import { User } from "@prisma/client";

export interface IAuthService {
  login: (email: string, password: string) => Promise<User>;
}
