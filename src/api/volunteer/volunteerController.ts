import { Request, Response } from "express";

export const getVolunteers = (req: Request, res: Response): void => {
    res.json({ message: "Here are the volunteers!" });
};

export const addVolunteer = (req: Request, res: Response): void => {
    const volunteer = req.body;
    res.status(201).json({ message: "Volunteer added!", volunteer });
};

export const updateVolunteer = (req: Request, res: Response): void => {
    const volunteer = req.body;
    res.status(201).json({ message: "Volunteer updated!", volunteer });
};

export const deleteVolunteer = (req: Request, res: Response): void => {
    const volunteer = req.body;
    res.status(201).json({ message: "Volunteer deleted!", volunteer });
};
