import { Request, Response } from "express";
import {
    addVolunteerInterestService,
    getAllVolunteerInterestsService,
} from "./volunteerInterestService";

export const getVolunteerInterests = async (req: Request, res: Response) => {
    try {
        const interests = await getAllVolunteerInterestsService();
        res.status(200).json(interests);
    } catch (error) {
        res.status(500).json({
            error_code: "VOLNINT201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while retrieving all volunteer interest data : ${error}`,
        });
    }
};

export const addVolunteerInterest = async (req: Request, res: Response) => {
    try {
        const interest = await addVolunteerInterestService(req.body);

        res.status(201).json(interest);
    } catch (error) {
        res.status(500).json({
            error_code: "VOLNINT201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while adding volunteer interest : ${error} `,
        });
    }
};
