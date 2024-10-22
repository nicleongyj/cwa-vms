import { fetchAllUsers } from "../userService";
import request from "supertest";
import userRouter from "../userRouter";
import express, { NextFunction, Request, Response } from "express";

const app = express();
jest.mock("../../../common/middleware/withAuth", () => {
    return (req: Request, res: Response, next: NextFunction) => {
        /* Do nothing */
        next();
    };
});

describe("User Service", () => {
    it("should get all users correctly", async () => {
        const users = await fetchAllUsers();
        expect(users).toStrictEqual([{ name: "Yong Jing" }, { name: "Zeyu" }]);
    });
});

describe("User API", () => {
    userRouter(app);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get user correctly", async () => {
        const response = await request(app)
            .get("/user/some-uuid-1")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            name: "Yong Jing",
        });
    });
});
