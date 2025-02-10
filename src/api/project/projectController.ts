import { Request, Response } from "express";
import {
    getProjectService,
    getAllProjectsService,
    addProjectService,
    updateProjectService,
    deleteProjectService,
} from "./projectService";
import { ProjectFetch } from "./projectModel";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await getAllProjectsService();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            error_code: "PROJ201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while retrieving all project data : ${error}`,
        });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const projectId: ProjectFetch = { id: String(req.params.id) };
        const project = await getProjectService(projectId);

        if (!project) {
            res.status(404).json({
                error_code: "PROJ301",
                message: "Project not found",
                details: `Project with ID '${projectId}' does not exist`,
            });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({
            error_code: "PROJ201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while retrieving project by id : ${error}`,
        });
    }
};

export const addProject = async (req: Request, res: Response) => {
    try {
        const project = await addProjectService(req.body);

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({
            error_code: "PROJ201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while adding project : ${error} `,
        });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const projectId = String(req.params.id);
        const project = await updateProjectService(projectId, req.body);
        if (!project) {
            res.status(404).json({
                error_code: "PROJ301",
                message: "Project not found",
                details: `Project with ID '${projectId}' does not exist`,
            });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({
            error_code: "PROJ201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while updating project : ${error}`,
        });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const projectId: ProjectFetch = { id: String(req.params.id) };
        const project = await deleteProjectService(projectId);

        if (!project) {
            res.status(404).json({
                error_code: "PROJ301",
                message: "Project not found",
                details: `Project with ID '${projectId}' does not exist`,
            });
        } else {
            res.status(200).send({ message: "Project deleted!" });
        }
    } catch {
        res.status(500).json({
            error_code: "PROJ201",
            message: "Unexpected server error, please contact support for help",
            details: "Error while retrieving deleting project",
        });
    }
};
