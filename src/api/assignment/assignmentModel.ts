import { z } from "zod";

// Define Enum for Assignment Status
export const AssignmentStatusEnum = z.enum(["ACCEPT", "REJECT", "RECONSIDER"]);

// Define Assignment Schema
export const AssignmentSchema = z.object({
    // TODO: change id to uuid
    assignment_id: z.string().optional(),
    volunteer_id: z.string(),
    project_id: z.string(),
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
    status: AssignmentStatusEnum.default("RECONSIDER"),
    volunteer_role: z.string(),
});

export type AssignmentMapType = {
    assignment_id: string;
    start_date: Date; // Prisma returns a Date object
    status: "ACCEPT" | "REJECT" | "RECONSIDER";
    volunteer?: {
        end_user?: {
            general_user?: {
                name: string;
            };
            dob?: Date | null; // Prisma uses Date, and it can be nullable
        };
    };
};

export type AssignmentCleanOutput = {
    assignment_id: string;
    name: string;
    age: number | null | undefined;
    submission_date: Date;
    approval_status: "ACCEPT" | "REJECT" | "RECONSIDER";
};

// Infer TypeScript type from the schema
export type AssignmentCreate = z.infer<typeof AssignmentSchema>;

// Define Schema for ID Validation
export const AssignmentIdSchema = z.object({
    id: z.string(),
});

export type AssignmentUpdate = z.infer<typeof AssignmentIdSchema>;
export type AssignmentFetch = z.infer<typeof AssignmentIdSchema>;
