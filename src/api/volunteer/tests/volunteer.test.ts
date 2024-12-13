import { getAllVolunteersService } from "../volunteerService";
import request from "supertest";
import volunteerRouter from "../volunteerRouter";
import express, { NextFunction, Request, Response } from "express";

const app = express();
jest.mock("../../../common/middleware/withAuth", () => {
    return (req: Request, res: Response, next: NextFunction) => {
        /* Do nothing */
        next();
    };
});

describe("Volunteer Service", () => {
    it("should get all volunteers correctly", async () => {
        const users = await getAllVolunteersService();
        expect(users).toStrictEqual([
            { id: "uuid-1", name: "Yong Jing", email: "yongjingg@gmail.com" },
            { id: "uuid-2", name: "Zeyu", email: "zeyu@gmail.com" },
        ]);
    });
});

describe("User API", () => {
    volunteerRouter(app);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get volunteer correctly", async () => {
        const response = await request(app)
            .get("/volunteer/uuid-1")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            id: "uuid-1",
            name: "Yong Jing",
            email: "yongjing@gmail.com",
        });
    });
});
