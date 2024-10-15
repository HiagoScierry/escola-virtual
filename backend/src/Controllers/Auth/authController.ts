import { Request, Response } from "express";
import { loginSchema } from "./authSchema";
import { AuthService } from "../../Service/AuthService";

const login = async (request: Request, response: Response) => {
  const { email, password } = loginSchema.parse(request.body);

  const authService = new AuthService();

  const user = await authService.login(email, password);

  if (!user) {
    return response.status(401).json({ error: "Invalid credentials" });
  }

  return response.status(200).json({
    message: "Logged in successfully",
    user
   });
};

export { login };
