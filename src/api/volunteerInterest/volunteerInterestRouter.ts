import { Router } from "express";
import { addVolunteerInterest, getVolunteerInterests } from "./volunteerInterestController";
import { withRequestBodyValidation } from "../../common/middleware/withRequestValidation";
import { VolunteerInterestSchema } from "./volunteerInterestModel";
import express from "express";

const route = Router();

export default (app: Router) => {
    app.use(express.json());
    app.use("/volunteer_interest", route);

    // GET all volunteers
    route.get("/", getVolunteerInterests);

    // Add volunteer
    route.post("/", withRequestBodyValidation(VolunteerInterestSchema), addVolunteerInterest);
};
