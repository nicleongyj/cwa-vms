import { getAllDonorsService } from "../donorService";
import request from "supertest";
import donorRouter from "../donorRouter";
import express, { NextFunction, Request, Response } from "express";

const app = express();
jest.mock("../../../common/middleware/withAuth", () => {
    return (req: Request, res: Response, next: NextFunction) => {
        /* Do nothing */
        next();
    };
});

describe("Donor Service", () => {
    it("should get all donors correctly", async () => {
        const donors = await getAllDonorsService();
        expect(donors).toStrictEqual([
            {
                donor_id: "uuid-1",
                frequency: "ONE_TIME",
                end_user_id: "user-1",
                donations: [
                    {
                        donation_id: "donation-1",
                        donor_id: "uuid-1",
                        project_id: "project-1",
                        amount: 100.0,
                        payment_method: "Credit Card",
                        donation_date: "2024-12-01",
                        tax_deduction: true,
                    },
                ],
            },
            {
                donor_id: "uuid-2",
                frequency: "MONTHLY",
                end_user_id: "user-2",
                donations: [
                    {
                        donation_id: "donation-2",
                        donor_id: "uuid-2",
                        project_id: "project-2",
                        amount: 50.0,
                        payment_method: "PayPal",
                        donation_date: "2024-12-02",
                        tax_deduction: false,
                    },
                ],
            },
            {
                donor_id: "uuid-3",
                frequency: "YEARLY",
                end_user_id: "user-3",
                donations: [],
            },
        ]);
    });
});

describe("Donor API", () => {
    donorRouter(app);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Positive test case for `getDonorById`
    it("should retrieve the correct donor", async () => {
        const response = await request(app)
            .get("/donor/uuid-1")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            donor_id: "uuid-1",
            frequency: "ONE_TIME",
            end_user_id: "user-1",
            donations: [
                {
                    donation_id: "donation-1",
                    donor_id: "uuid-1",
                    project_id: "project-1",
                    amount: 100.0,
                    payment_method: "Credit Card",
                    donation_date: "2024-12-01",
                    tax_deduction: true,
                },
            ],
        });
    });

    // Negative test case for `getDonorById` - Donor not found
    it("should return 404 if donor is not found", async () => {
        const response = await request(app)
            .get("/donor/invalid-id")
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(404);
        expect(response.body).toStrictEqual({
            error_code: "DNR301",
            message: "Donor not found",
            details: "Donor with ID 'invalid-id' does not exist",
        });
    });

    // Positive test case for `addDonor`
    it("should add donor correctly", async () => {
        const newDonor = {
            donor_id: "uuid-4",
            frequency: "ONE_TIME",
            end_user_id: "user-4",
            donations: [
                {
                    donation_id: "donation-3",
                    donor_id: "uuid-4",
                    project_id: "project-3",
                    amount: 150.0,
                    payment_method: "Bank Transfer",
                    donation_date: "2024-12-03",
                    tax_deduction: true,
                },
            ],
        };

        const response = await request(app)
            .post("/donor")
            .send(newDonor)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(201);
        expect(response.body).toStrictEqual({
            donor_id: "uuid-4",
            frequency: "ONE_TIME",
            end_user_id: "user-4",
            donations: [
                {
                    donation_id: "donation-3",
                    donor_id: "uuid-4",
                    project_id: "project-3",
                    amount: 150.0,
                    payment_method: "Bank Transfer",
                    donation_date: "2024-12-03",
                    tax_deduction: true,
                },
            ],
        });
    });

    // Negative test case for `addDonor` - Missing name
    it("should return 400 if donor input is invalid (name not string)", async () => {
        const invalidDonor = {
            donor_id: 123,
            frequency: "ONE_TIME",
            end_user_id: "user-4",
        };

        const response = await request(app)
            .post("/donor")
            .send(invalidDonor)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(400);
    });

    it("should return 400 if donor input is invalid (wrong frequency)", async () => {
        const invalidDonor = {
            donor_id: "uuid-1",
            frequency: "NEVER",
            end_user_id: "user-1",
        };

        const response = await request(app)
            .post("/donor")
            .send(invalidDonor)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(400);
    });

    // Positive test case for `updateDonor`
    it("should update donor correctly", async () => {
        const donorId = "uuid-1";
        const updatedDonorData = {
            donor_id: "uuid-1",
            frequency: "ONE_TIME",
            end_user_id: "user-1",
            donations: [
                {
                    donation_id: "donation-1",
                    donor_id: "uuid-1",
                    project_id: "project-1",
                    amount: 100.0,
                    payment_method: "Credit Card",
                    donation_date: "2024-12-01",
                    tax_deduction: true,
                },
                {
                    donation_id: "donation-2",
                    donor_id: "uuid-1",
                    project_id: "project-2",
                    amount: 10.0,
                    payment_method: "Credit Card",
                    donation_date: "2024-12-01",
                    tax_deduction: false,
                },
            ],
        };

        const response = await request(app)
            .patch(`/donor/${donorId}`)
            .send(updatedDonorData)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            donor_id: "uuid-1",
            frequency: "ONE_TIME",
            end_user_id: "user-1",
            donations: [
                {
                    donation_id: "donation-1",
                    donor_id: "uuid-1",
                    project_id: "project-1",
                    amount: 100.0,
                    payment_method: "Credit Card",
                    donation_date: "2024-12-01",
                    tax_deduction: true,
                },
                {
                    donation_id: "donation-2",
                    donor_id: "uuid-1",
                    project_id: "project-2",
                    amount: 10.0,
                    payment_method: "Credit Card",
                    donation_date: "2024-12-01",
                    tax_deduction: false,
                },
            ],
        });
    });

    // Negative test case for `updateDonor` - Donor not found
    it("should return 404 if donor to update is not found", async () => {
        const invalidId = "non-existing-id";
        const updatedDonorData = {
            donor_id: "uuid-1",
            frequency: "YEARLY",
            end_user_id: "user-1",
        };

        const response = await request(app)
            .patch(`/donor/${invalidId}`)
            .send(updatedDonorData)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(404);
        expect(response.body).toStrictEqual({
            error_code: "DNR301",
            message: "Donor not found",
            details: `Donor with ID '${invalidId}' does not exist`,
        });
    });

    // Positive test case for `deleteDonor`
    it("should delete donor correctly", async () => {
        const donorId = "uuid-1";

        const response = await request(app)
            .delete(`/donor/${donorId}`)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            message: "Donor deleted!",
        });
    });

    // Negative test case for `deleteDonor` - Donor not found
    it("should return 404 if donor to delete is not found", async () => {
        const invalidId = "non-existing-id";

        const response = await request(app)
            .delete(`/donor/${invalidId}`)
            .set("Authorization", "Bearer skibidi-toilet");

        expect(response.status).toEqual(404);
        expect(response.body).toStrictEqual({
            error_code: "DNR301",
            message: "Donor not found",
            details: `Donor with ID '${invalidId}' does not exist`,
        });
    });
});
