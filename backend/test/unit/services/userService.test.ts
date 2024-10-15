import { UserService } from "../../../src/Service/UserService";
import { describe, it, beforeAll, expect } from "@jest/globals";

describe("Testing AuthService", () => {
    let userService: UserService;

    describe("Listing Users", () => {
        beforeAll(() => {
            userService = new UserService();
        });

        it("Should return a list of users", async () => {
            const users = await userService.list();

            expect(users).toHaveLength(3);
        });

        it("Should return a list of users with the correct properties", async () => {
            const users = await userService.list();

            expect(users).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        email: expect.any(String),
                        password: expect.any(String),
                    }),
                ]),
            );
        });
    });
});
