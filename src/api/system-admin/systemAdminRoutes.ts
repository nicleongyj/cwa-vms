import express from "express";
import * as systemAdminController from "./systemAdminController";

const router = express.Router();

// Routes
router.post("/system-admins", systemAdminController.createSystemAdmin);
router.put(
    "/system-admins/:userId/permissions",
    systemAdminController.updateSystemAdminPermissions,
);
router.get("/system-admins", systemAdminController.getAllSystemAdmins);
router.get("/system-admins/:userId", systemAdminController.getSystemAdmin);

export default router;
