import express, { Application } from "express";
import * as systemAdminController from "./systemAdminController";
import { Router } from "express";

const route = Router();

export default function systemAdminRouter(app: Application) {
    app.use(express.json());
    app.use("/system-admin", route);

    // Routes
    route.post("/", systemAdminController.createSystemAdmin);
    route.put("/:userId/permissions", systemAdminController.updateSystemAdminPermissions);
    route.get("/", systemAdminController.getAllSystemAdmins);
    route.get("/:userId", systemAdminController.getSystemAdmin);
}
