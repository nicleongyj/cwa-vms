import request from "supertest";
import express, { NextFunction, Request, Response } from "express";
import systemAdminRouter from "../systemAdminRouter";

const app = express();
jest.mock("../../../common/middleware/withAuth", () => {
    return (req: Request, res: Response, next: NextFunction) => {
        next();
    };
});

describe("System Admin API", () => {
    systemAdminRouter(app);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create system admin correctly", async () => {
        const newAdmin = {
            id: "admin-123",
            name: "Test Admin",
            email: "admin@cwa.gov.sg",
            permissions: {
                canViewDonors: true,
                canEditDonors: true,
                canViewUsers: true,
                canManageUsers: true,
                isSystemAdmin: true,
            },
            role: "SYSTEM_ADMIN",
        };

        const response = await request(app)
            .post("/system-admin")
            .send(newAdmin)
            .set("Authorization", "Bearer test-token");

        expect(response.status).toEqual(201);
        expect(response.body).toStrictEqual({
            success: true,
            data: newAdmin,
        });
    });

    it("should return 400 if email is not from CWA domain", async () => {
        const invalidAdmin = {
            id: "admin-123",
            name: "Test Admin",
            email: "admin@skibidiinvalid.com",
            permissions: {
                canViewDonors: true,
                canEditDonors: true,
                canViewUsers: true,
                canManageUsers: true,
                isSystemAdmin: true,
            },
            role: "SYSTEM_ADMIN",
        };

        const response = await request(app)
            .post("/system-admin")
            .send(invalidAdmin)
            .set("Authorization", "Bearer test-token");

        expect(response.status).toEqual(400);
    });

    it("should update system admin permissions correctly", async () => {
        const adminId = "admin-123";
        const updatedPermissions = {
            permissions: {
                canViewDonors: false,
                canEditDonors: false,
                canViewUsers: true,
                canManageUsers: true,
                isSystemAdmin: true,
            },
        };

        const response = await request(app)
            .put(`/system-admin/${adminId}/permissions`)
            .send(updatedPermissions)
            .set("Authorization", "Bearer test-token");

        expect(response.status).toEqual(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.permissions).toStrictEqual(updatedPermissions.permissions);
    });

    it("should get all system admins", async () => {
        const response = await request(app)
            .get("/system-admin")
            .set("Authorization", "Bearer test-token");

        expect(response.status).toEqual(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should get specific system admin", async () => {
        const adminId = "admin-123";
        const response = await request(app)
            .get(`/system-admin/${adminId}`)
            .set("Authorization", "Bearer test-token");

        expect(response.status).toEqual(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(adminId);
    });

    it("should return 404 for non-existent system admin", async () => {
        const response = await request(app)
            .get("/system-admin/non-existent")
            .set("Authorization", "Bearer test-token");

        expect(response.status).toEqual(404);
    });
});
