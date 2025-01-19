import { PrismaClient } from "@prisma/client";
import {
    AssignmentCleanOutput,
    AssignmentCreate,
    AssignmentDelete,
    AssignmentFetch,
    AssignmentIdSchema,
    AssignmentMapType,
    AssignmentSchema,
    AssignmentStatus,
    AssignmentStatusUpdate,
    AssignmentUpdate,
    UpdateAssignmentSchema,
} from "./assignmentModel";

const prisma = new PrismaClient();

export const addAssignmentService = async (assignment: AssignmentCreate) => {
    try {
        // Validate input using Zod
        const validatedData = AssignmentSchema.parse(assignment);

        // Insert into database
        const newAssignment = await prisma.assignment.create({
            data: validatedData,
        });

        return newAssignment;
    } catch (error) {
        console.error("Error in addAssignmentService:", error);
        throw new Error(`Failed to create assignment: ${error}`);
    }
};

export const getAllAssignmentsService = async () => {
    try {
        // Fetch assignments with only the required fields
        const assignments: AssignmentMapType[] = await prisma.assignment.findMany({
            select: {
                assignment_id: true,
                volunteer: {
                    select: {
                        end_user: {
                            select: {
                                general_user: {
                                    select: {
                                        name: true, // Fetch Name
                                    },
                                },
                                dob: true, // Fetch Date of Birth to calculate Age
                            },
                        },
                    },
                },
                start_date: true, // Fetch Time and Date of Submission
                status: true, // Fetch Approval Status
            },
        });

        // Transform data to include calculated age
        const transformedAssignments: AssignmentCleanOutput[] = assignments.map(
            (assignment: AssignmentMapType): AssignmentCleanOutput => ({
                assignment_id: assignment.assignment_id,
                name: assignment.volunteer?.end_user?.general_user?.name || "Unknown",
                age: assignment.volunteer?.end_user?.dob
                    ? new Date().getFullYear() -
                      new Date(assignment.volunteer.end_user.dob).getFullYear()
                    : undefined,
                submission_date: assignment.start_date, // Time and Date of Submission
                approval_status: assignment.status, // Approval Status
            }),
        );

        return transformedAssignments;
    } catch (error) {
        console.error("Error in getAllAssignmentsService:", error);
        throw new Error("Failed to fetch assignments.");
    }
};

export const getAssignmentByIdService = async (assignmentId: AssignmentFetch) => {
    try {
        // Validate the assignment ID format
        const validId = AssignmentIdSchema.parse(assignmentId);

        // Fetch assignment with all related details
        const assignment = await prisma.assignment.findUnique({
            where: { assignment_id: validId.id },
            include: {
                volunteer: {
                    include: {
                        end_user: {
                            include: {
                                general_user: true, // Fetch general user details
                            },
                        },
                    },
                },
                project: true, // Fetch project details
            },
        });

        if (!assignment) {
            throw new Error(`Assignment with ID '${validId}' not found.`);
        }

        return assignment;
    } catch (error) {
        console.error("Error in getAssignmentByIdService:", error);
        throw new Error(`Failed to fetch assignment: ${error}`);
    }
};

export const deleteAssignmentService = async (assignmentId: AssignmentDelete) => {
    try {
        // Validate assignment ID format
        const validId = AssignmentIdSchema.parse(assignmentId);

        // Check if the assignment exists
        const existingAssignment = await prisma.assignment.findUnique({
            where: { assignment_id: validId.id },
        });

        if (!existingAssignment) {
            throw new Error(`Assignment with ID '${validId.id}' not found.`);
        }

        // Delete the assignment
        const deletedAssignment = await prisma.assignment.delete({
            where: { assignment_id: validId.id },
        });

        return deletedAssignment;
    } catch (error) {
        console.error("Error in deleteAssignmentService:", error);
        throw new Error(`Failed to delete assignment: ${error}`);
    }
};

const updateAssignmentStatus = async (
    assignmentId: AssignmentStatusUpdate,
    status: AssignmentStatus,
) => {
    try {
        console.log(`Updating assignment ${assignmentId} to status: ${status}`);

        // Validate assignment ID format
        const validId = AssignmentIdSchema.parse(assignmentId);

        // Check if the assignment exists
        const existingAssignment = await prisma.assignment.findUnique({
            where: { assignment_id: validId.id },
        });

        if (!existingAssignment) {
            throw new Error(`Assignment with ID '${validId.id}' not found.`);
        }

        // Update assignment status
        const updatedAssignment = await prisma.assignment.update({
            where: { assignment_id: validId.id },
            data: { status },
        });

        console.log(`Assignment status updated to ${status}:`, updatedAssignment);
        return updatedAssignment;
    } catch (error) {
        console.error(`Error updating assignment to ${status}:`, error);
        throw new Error(`Failed to update assignment status: ${error}`);
    }
};

// Service to accept an assignment
export const acceptAssignmentService = async (assignmentId: AssignmentStatusUpdate) => {
    return updateAssignmentStatus(assignmentId, "ACCEPT");
};

// Service to reject an assignment
export const rejectAssignmentService = async (assignmentId: AssignmentStatusUpdate) => {
    return updateAssignmentStatus(assignmentId, "REJECT");
};

export const reconsiderAssignmentService = async (assignmentId: AssignmentStatusUpdate) => {
    return updateAssignmentStatus(assignmentId, "RECONSIDER");
};

export const updateAssignmentService = async (
    assignmentId: string,
    updateData: Partial<AssignmentUpdate>,
) => {
    try {
        console.log(`Updating assignment with ID: ${assignmentId}`);

        // Validate assignment ID format
        const validId = AssignmentIdSchema.parse({ id: assignmentId });

        // Validate update fields
        const validatedData = UpdateAssignmentSchema.parse(updateData);

        // Check if assignment exists
        const existingAssignment = await prisma.assignment.findUnique({
            where: { assignment_id: validId.id },
        });

        if (!existingAssignment) {
            throw new Error(`Assignment with ID '${validId.id}' not found.`);
        }

        // Update assignment (excluding `status` and `volunteer_id`)
        const updatedAssignment = await prisma.assignment.update({
            where: { assignment_id: validId.id },
            data: validatedData,
        });

        console.log("Assignment updated successfully:", updatedAssignment);
        return updatedAssignment;
    } catch (error) {
        console.error("Error in updateAssignmentService:", error);
        throw new Error(`Failed to update assignment: ${error}`);
    }
};
