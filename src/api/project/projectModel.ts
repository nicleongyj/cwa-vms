import { z } from "zod";

export const ProjectStatusEnum = z.enum(["ACTIVE", "COMPLETED"]);

export const ProjectSchema = z.object({
    project_id: z.string().uuid(),
    project_name: z.string(),
    description: z.string().optional(),
    skills_required: z.string().optional(),
    commitment_duration: z.string().optional(),
    status: ProjectStatusEnum.default("ACTIVE"),
    assigned_volunteers: z.string().optional(), // Assuming this is a JSON string representation
});

export const UpdateProjectSchema = z.object({
    project_name: z.string().optional(),
    description: z.string().optional(),
    skills_required: z.string().optional(),
    commitment_duration: z.string().optional(),
    status: ProjectStatusEnum.optional(),
    assigned_volunteers: z.string().optional(), // Assuming this is a JSON string representation
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectUpdate = z.infer<typeof UpdateProjectSchema>;
export type ProjectFetch = z.infer<typeof ProjectId>;
export type ProjectDelete = z.infer<typeof ProjectId>;

export const UpdateProject = UpdateProjectSchema.partial();

export const ProjectId = z.object({
    id: z.string().uuid(),
});
