import { Router } from "express";
import {
    getVolunteers,
    addVolunteer,
    updateVolunteer,
    deleteVolunteer,
} from "./volunteerController";

const route = Router();

export default (app: Router): void => {
    app.use("/volunteer", route);

    // GET endpoint
    route.get("/", getVolunteers);

    // POST endpoint
    route.post("/", addVolunteer);

    // PATCH endpoint
    route.patch("/", updateVolunteer);

    // DELETE endpoint
    route.delete("/", deleteVolunteer);
};
