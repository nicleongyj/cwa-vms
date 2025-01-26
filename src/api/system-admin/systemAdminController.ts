import { Request, Response } from "express";
import { SystemAdminSchema, UpdatePermissionsSchema } from "./systemAdminModel";
import * as systemAdminService from "./systemAdminService";

const createErrorResponse = (errorCode: string, message: string, details: string) => ({
    error_code: errorCode,
    message,
    details,
});

export const createSystemAdmin = async (req: Request, res: Response) => {
    try {
        const validatedData = SystemAdminSchema.parse(req.body);
        const admin = await systemAdminService.createSystemAdmin(validatedData);

        res.status(201).json({
            success: true,
            data: admin,
        });
    } catch {
        res.status(400).json(createErrorResponse("BAD_REQUEST", "Invalid request body", "error"));
    }
};

export const updateSystemAdminPermissions = async (req: Request, res: Response) => {
    try {
        const validatedData = UpdatePermissionsSchema.parse({
            userId: req.params.userId,
            permissions: req.body.permissions,
        });

        const admin = await systemAdminService.updateSystemAdminPermissions(
            validatedData.userId,
            validatedData.permissions,
        );

        res.json({
            success: true,
            data: admin,
        });
    } catch {
        res.status(400).json(createErrorResponse("BAD_REQUEST", "Invalid request body", "error"));
    }
};

export const getAllSystemAdmins = async (_req: Request, res: Response) => {
    try {
        const admins = await systemAdminService.getAllSystemAdmins();
        res.json({
            success: true,
            data: admins,
        });
    } catch {
        res.status(500).json(
            createErrorResponse("BAD_REQUEST", "Invalid request body", "No such Resource"),
        );
    }
};

export const getSystemAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await systemAdminService.getSystemAdmin(req.params.userId);
        res.json({
            success: true,
            data: admin,
        });
    } catch {
        res.status(404).json(
            createErrorResponse("BAD_REQUEST", "Resource does not exist", "No such Resource"),
        );
    }
};
