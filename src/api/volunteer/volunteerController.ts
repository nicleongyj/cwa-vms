import { Request, Response } from "express";
import {
    getVolunteerService,
    getAllVolunteersService,
    addVolunteerService,
    deleteVolunteerService,
} from "./volunteerService";
import { VolunteerSchema } from "./volunteerModel";
import { z } from "zod";

export const getVolunteers = async (req: Request, res: Response) => {
    const volunteers = await getAllVolunteersService();

    const validation = z.array(VolunteerSchema).safeParse(volunteers);
    if (!validation.success) {
        res.status(400).json({
            error: "Invalid volunteer data",
            details: validation.error.format(),
        });
    }
    res.status(200).json(volunteers);
};

export const getVolunteerById = async (req: Request, res: Response) => {
    const volunteerId = String(req.params.id);
    const volunteer = await getVolunteerService(volunteerId);

    const validation = VolunteerSchema.safeParse(volunteer);
    if (!validation.success) {
        res.status(400).json({
            error: "Invalid volunteer data",
            details: validation.error.format(),
        });
    }
    res.status(200).json(volunteer);
};

export const addVolunteer = async (req: Request, res: Response) => {
    const volunteer = req.body;
    const result = await addVolunteerService(volunteer);
    res.status(200).json(result);
};

export const updateVolunteer = async (req: Request, res: Response) => {
    //TODO
    res.status(200).json({ message: "Volunteer updated!" });
};

export const deleteVolunteer = async (req: Request, res: Response) => {
    const volunteerId = String(req.params.id);
    const result = await deleteVolunteerService(volunteerId);
    res.status(200).json(result);
};
