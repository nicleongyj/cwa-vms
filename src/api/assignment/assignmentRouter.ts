import { Router } from "express";
import { addAssignment, getAssignmentById, getAssignments } from "./assignmentController";
import {
    withRequestBodyValidation,
    withRequestParamsValidation,
} from "../../common/middleware/withRequestValidation";
import { AssignmentIdSchema, AssignmentSchema } from "./assignmentModel";
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

    // Update assignment
    // Note : Update route will not able to change end_user_id. The controller will auto drop end_user_id if passed in
    // route.patch("/:id", withRequestParamsValidation(VolunteerId), updateVolunteer);

    // Delete assignment
    // route.delete("/:id", withRequestParamsValidation(VolunteerId), deleteVolunteer);
};
