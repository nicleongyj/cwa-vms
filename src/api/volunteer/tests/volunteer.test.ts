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
            { id: "uuid-3", name: "Jing", email: "jing@gmail.com" },
        ]);
    });
});

describe("Volunteer API", () => {
    volunteerRouter(app);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Positive test case for `getVolunteerById`
    it("should retrieve the correct volunteer", async () => {
        const response = await request(app)
            .get("/volunteer/uuid-1")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            id: "uuid-1",
            name: "Yong Jing",
            email: "yongjingg@gmail.com",
        });
    });

    // Negative test case for `getVolunteerById` - Volunteer not found
    it("should return 404 if volunteer is not found", async () => {
        const response = await request(app)
            .get("/volunteer/invalid-id")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(404);
        expect(response.body).toStrictEqual({
            error_code: "VOLN301",
            message: "Volunteer not found",
            details: "Volunteer with ID 'invalid-id' does not exist",
        });
    });

    // Positive test case for 'searchVolunteer'
    it("should retrieve volunteers by name", async () => {
        const response = await request(app)
            .get("/volunteer/search?name=Jing")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual([
            { id: "uuid-1", name: "Yong Jing", email: "yongjingg@gmail.com" },
            { id: "uuid-3", name: "Jing", email: "jing@gmail.com" },
        ]);
    });

    // Negative test case for `searchVolunteer` - No match found
    it("should return an empty array if no volunteer matches the search query", async () => {
        const response = await request(app)
            .get("/volunteer/search?name=null")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual([]);
    });

    // Negative test case for `searchVolunteer` - Missing query parameter
    it("should return 400 if the query parameter is missing", async () => {
        const response = await request(app)
            .get("/volunteer/search")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(400);
        expect(response.body).toStrictEqual({
            error_code: "VOLN401",
            message: "Name query parameter is required",
            details: "Please provide a 'name' query parameter",
        });
    });

    // Positive test case for `addVolunteer`
    it("should add volunteer correctly", async () => {
        const newVolunteer = {
            id: "uuid-4",
            name: "Nicholas",
            email: "nicholas@gmail.com",
        };

        const response = await request(app)
            .post("/volunteer")
            .send(newVolunteer)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(201);
        expect(response.body).toStrictEqual({
            id: "uuid-4",
            name: "Nicholas",
            email: "nicholas@gmail.com",
        });
    });

    // Negative test case for `addVolunteer` - Missing name
    it("should return 400 if volunteer input is invalid (missing name)", async () => {
        const invalidVolunteer = {
            id: "uuid-3",
            email: "nic@gmail.com",
        };

        const response = await request(app)
            .post("/volunteer")
            .send(invalidVolunteer)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(400);
    });

    // Negative test case for `addVolunteer` - Invalid name
    it("should return 400 if volunteer input is invalid (name is invalid)", async () => {
        const invalidVolunteer = {
            id: "uuid-3",
            name: 123,
            email: "nic@gmail.com",
        };

        const response = await request(app)
            .post("/volunteer")
            .send(invalidVolunteer)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(400);
    });

    // Positive test case for `updateVolunteer`
    it("should update volunteer correctly", async () => {
        const volunteerId = "uuid-1";
        const updatedVolunteerData = {
            id: "uuid-1",
            name: "Tom",
            email: "tom@gmail.com",
        };

        const response = await request(app)
            .patch(`/volunteer/${volunteerId}`)
            .send(updatedVolunteerData)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            id: "uuid-1",
            name: "Tom",
            email: "tom@gmail.com",
        });
    });

    // Negative test case for `updateVolunteer` - Volunteer not found
    it("should return 404 if volunteer to update is not found", async () => {
        const invalidId = "non-existing-id";
        const updatedVolunteerData = {
            id: "uuid-1",
            name: "Tom",
            email: "tom@gmail.com",
        };

        const response = await request(app)
            .patch(`/volunteer/${invalidId}`)
            .send(updatedVolunteerData)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(404);
        expect(response.body).toStrictEqual({
            error_code: "VOLN301",
            message: "Volunteer not found",
            details: `Volunteer with ID '${invalidId}' does not exist`,
        });
    });

    // Positive test case for `deleteVolunteer`
    it("should delete volunteer correctly", async () => {
        const volunteerId = "uuid-1";

        const response = await request(app)
            .delete(`/volunteer/${volunteerId}`)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            message: "Volunteer deleted!",
        });
    });

    // Negative test case for `deleteVolunteer` - Volunteer not found
    it("should return 404 if volunteer to delete is not found", async () => {
        const invalidId = "non-existing-id";

        const response = await request(app)
            .delete(`/volunteer/${invalidId}`)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(404);
        expect(response.body).toStrictEqual({
            error_code: "VOLN301",
            message: "Volunteer not found",
            details: `Volunteer with ID '${invalidId}' does not exist`,
        });
    });
});
