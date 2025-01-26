import express from "express";
import * as systemAdminController from "./systemAdminController";

const router = express.Router();

// Routes
router.post("/users", systemAdminController.createUser);
router.put("/users/:userId/permissions", systemAdminController.updateUserPermissions);
router.get("/users", systemAdminController.getAllUsers);
router.get("/users/:userId", systemAdminController.getUser);

export default router;
