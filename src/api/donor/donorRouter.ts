import { Router } from "express";
import { getDonors, getDonorById, addDonor, updateDonor, deleteDonor } from "./donorController";
import {
    withRequestBodyValidation,
    withRequestParamsValidation,
} from "../../common/middleware/withRequestValidation";
import { GetDonorId, DonorSchema } from "./donorModel";
import express from "express";

const route = Router();

export default (app: Router) => {
    app.use(express.json());
    app.use("/donor", route);

    // GET all donors
    route.get("/", getDonors);

    // GET donor by ID
    route.get("/:id", withRequestParamsValidation(GetDonorId), getDonorById);

    // Add a donor
    route.post("/", withRequestBodyValidation(DonorSchema), addDonor);

    // Update donor
    route.patch("/:id", withRequestParamsValidation(GetDonorId), updateDonor);

    // Delete donor
    route.delete("/:id", withRequestParamsValidation(GetDonorId), deleteDonor);
};