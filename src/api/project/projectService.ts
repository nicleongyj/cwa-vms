import {
    ProjectSchema,
    Project,
    ProjectId,
    ProjectFetch,
    ProjectUpdate,
    UpdateProject,
    ProjectDelete,
} from "./projectModel";
import { z } from "zod";
import prisma from "../../common/utils/prisma";

export const getAllProjectsService = async () => {
    try {
        const projects = await prisma.project.findMany();

        return projects;
    } catch (error) {
        console.error("Error in getAllProjectsService:", error);
        throw new Error("Failed to fetch projects.");
    }
};

export const getProjectService = async (projectId: ProjectFetch) => {
    try {
        // Validate input using Zod
        ProjectId.parse(projectId);

        // Fetch project from the database
        const project = await prisma.project.findUnique({
            where: { project_id: projectId.id },
        });

        if (!project) {
            throw new Error(`Project with ID '${projectId}' not found.`);
        }

        return project;
    } catch (error) {
        console.error("Error in getProjectService:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to fetch project: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred while fetching project.");
        }
    }
};

export const addProjectService = async (project: Project) => {
    try {
        // Validate input using Zod
        const validatedData = ProjectSchema.parse(project);

        // Create project in the database
        const newProject = await prisma.project.create({
            data: validatedData,
        });

        return newProject;
    } catch (error) {
        console.error("Error in addProjectService:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to create project: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred while creating project.");
        }
    }
};

export const updateProjectService = async (
    projectId: string,
    projectData: Partial<ProjectUpdate>, // Allows updating only some fields
) => {
    try {
        // Validate ID format
        const validId = z.string().uuid().parse(projectId);

        // Validate update data (must match the ProjectSchema structure)
        const validatedData = UpdateProject.parse(projectData);

        // Check if the project exists in the database
        const existingProject = await prisma.project.findUnique({
            where: { project_id: validId },
        });

        if (!existingProject) {
            throw new Error(`Project with ID '${validId}' not found.`);
        }

        // Perform the update
        const updatedProject = await prisma.project.update({
            where: { project_id: validId },
            data: validatedData,
        });

        return updatedProject;
    } catch (error) {
        console.error("Error in updateProjectService:", error);
        throw new Error(`Failed to update project: ${error}`);
    }
};

export const deleteProjectService = async (projectId: ProjectDelete) => {
    try {
        // Validate ID format
        const validId = ProjectId.parse(projectId);

        // Check if the project exists
        const existingProject = await prisma.project.findUnique({
            where: { project_id: validId.id },
        });

        if (!existingProject) {
            throw new Error(`Project with ID '${validId}' not found.`);
        }

        // Delete the project
        const deletedProject = await prisma.project.delete({
            where: { project_id: validId.id },
        });

        return deletedProject;
    } catch (error) {
        console.error("Error in deleteProjectService:", error);
        throw new Error(`Failed to delete project: ${error}`);
    }
};
