import { Router } from "express";
import {
    acceptAssignment,
    addAssignment,
    deleteAssignmentById,
    getAssignmentById,
    getAssignments,
    reconsiderAssignment,
    rejectAssignment,
    updateAssignment,
} from "./assignmentController";
import {
    withRequestBodyValidation,
    withRequestParamsValidation,
} from "../../common/middleware/withRequestValidation";
import { AssignmentIdSchema, AssignmentSchema, UpdateAssignmentSchema } from "./assignmentModel";
import express from "express";

const route = Router();

export default (app: Router) => {
    app.use(express.json());
    app.use("/assignment", route);

    // GET all assignments
    route.get("/", getAssignments);

    // Get assignment by ID
    route.get("/:id", withRequestParamsValidation(AssignmentIdSchema), getAssignmentById);

    // Add assignment request
    // Note, if status is not passed it, it will be default : RECONSIDER
    route.post("/", withRequestBodyValidation(AssignmentSchema), addAssignment);

    // Update assignment status
    // TODO: Add admin restriction middleware
    // NOTE : Split out three api to handle different behaviour of each actions
    route.patch("/accept/:id", withRequestParamsValidation(AssignmentIdSchema), acceptAssignment);
    route.patch("/reject/:id", withRequestParamsValidation(AssignmentIdSchema), rejectAssignment);
    route.patch(
        "/reconsider/:id",
        withRequestParamsValidation(AssignmentIdSchema),
        reconsiderAssignment,
    );

    // This update is for user to update their assignment request
    // NOTE: This path is not allow to change status, assignment_id, volunteer_id.
    route.patch(
        "/edit/:id",
        withRequestParamsValidation(AssignmentIdSchema),
        withRequestBodyValidation(UpdateAssignmentSchema),
        updateAssignment,
    );

    // Delete assignment
    route.delete("/:id", withRequestParamsValidation(AssignmentIdSchema), deleteAssignmentById);
};
