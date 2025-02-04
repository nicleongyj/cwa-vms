import { Router } from "express";
import {
    getProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
} from "./projectController";
import {
    withRequestBodyValidation,
    withRequestParamsValidation,
} from "../../common/middleware/withRequestValidation";
import {
    ProjectId,
    ProjectSchema,
} from "./projectModel";
import express from "express";

const route = Router();

export default (app: Router) => {
    app.use(express.json());
    app.use("/project", route);

    // GET all projects
    route.get("/", getProjects);

    // Get project by ID
    route.get("/:id", withRequestParamsValidation(ProjectId), getProjectById);

    // Add project
    route.post("/", withRequestBodyValidation(ProjectSchema), addProject);

    // Update project
    route.patch("/:id", withRequestParamsValidation(ProjectId), updateProject);

    // Delete project
    route.delete("/:id", withRequestParamsValidation(ProjectId), deleteProject);
};
