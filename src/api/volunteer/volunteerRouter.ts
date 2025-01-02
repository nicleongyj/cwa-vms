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
import { GetVolunteerId, VolunteerSchema } from "./volunteerModel";
import express from "express";

const route = Router();

export default (app: Router) => {
    app.use(express.json());
    app.use("/volunteer", route);

    // GET all volunteers
    route.get("/", getVolunteers);

    // Get volunteer by ID
    route.get("/:id", withRequestParamsValidation(GetVolunteerId), getVolunteerById);

    // Add volunteer
    route.post("/", withRequestBodyValidation(VolunteerSchema), addVolunteer);

    // Update volunteer
    route.patch(
        "/:id",
        withRequestParamsValidation(GetVolunteerId),
        withRequestBodyValidation(VolunteerSchema),
        updateVolunteer,
    );

    // Delete volunteer
    route.delete("/:id", withRequestParamsValidation(GetVolunteerId), deleteVolunteer);
};
