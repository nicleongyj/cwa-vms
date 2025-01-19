import { Router } from "express";
import {
    getVolunteers,
    getVolunteerById,
    addVolunteer,
    updateVolunteer,
    deleteVolunteer,
} from "./volunteerController";
import {
    withRequestBodyValidation,
    withRequestParamsValidation,
} from "../../common/middleware/withRequestValidation";
import { VolunteerId, VolunteerSchema } from "./volunteerModel";
import express from "express";

const route = Router();

export default (app: Router) => {
    app.use(express.json());
    app.use("/volunteer", route);

    // GET all volunteers
    route.get("/", getVolunteers);

    // Get volunteer by ID
    route.get("/:id", withRequestParamsValidation(VolunteerId), getVolunteerById);

    // Add volunteer
    route.post("/", withRequestBodyValidation(VolunteerSchema), addVolunteer);

    // Update volunteer
    // Note : Update route will not able to change end_user_id. The controller will auto drop end_user_id if passed in
    route.patch("/:id", withRequestParamsValidation(VolunteerId), updateVolunteer);

    // Delete volunteer
    route.delete("/:id", withRequestParamsValidation(VolunteerId), deleteVolunteer);
};
