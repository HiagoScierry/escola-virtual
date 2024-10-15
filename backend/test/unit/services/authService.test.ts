import { AuthService } from "../../../src/Service/AuthService";
import { describe, it, beforeAll, expect } from "@jest/globals";

describe("Testing AuthService", () => {
  describe("Login Method", () => {
    let authService: AuthService;

    beforeAll(() => {
      authService = new AuthService();
    });

    it("Should return true if user exists and this user have property isAdmin but this value is true", async () => {
      const user = await authService.login("giuliano@mail.com", "123456");

      expect(user).toHaveProperty("isAdmin");
      expect(user.isAdmin).toBeTruthy();
    });

    it("Should return true if user exists and this user have property isAdmin but the value is false", async () => {
      const user = await authService.login("hiago@mail.com", "123456");

      expect(user).toHaveProperty("isAdmin");
      expect(user.isAdmin).toBe(false);
    });

    it("Should return false if user not exists", async () => {
      await expect(() =>
        authService.login("fake@mail.com", "123456"),
      ).rejects.toThrowError(new Error("User not found"));
    });

    it("Should return false if user exists but the password is incorrect", async () => {
      await expect(() =>
        authService.login("giuliano@mail.com", "1234567"),
      ).rejects.toThrowError(new Error("Invalid credentials"));
    });
  });
});
