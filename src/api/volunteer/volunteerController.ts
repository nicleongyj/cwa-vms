import { Request, Response } from "express";
import {
    getVolunteerService,
    getAllVolunteersService,
    addVolunteerService,
    updateVolunteerService,
    deleteVolunteerService,
} from "./volunteerService";
import { VolunteerFetch } from "./volunteerModel";

export const getVolunteers = async (req: Request, res: Response) => {
    try {
        const volunteers = await getAllVolunteersService();
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while retrieving all volunteer data : ${error}`,
        });
    }
};

export const getVolunteerById = async (req: Request, res: Response) => {
    try {
        const volunteerId: VolunteerFetch = { id: String(req.params.id) };
        const volunteer = await getVolunteerService(volunteerId);

        if (!volunteer) {
            res.status(404).json({
                error_code: "VOLN301",
                message: "Volunteer not found",
                details: `Volunteer with ID '${volunteerId}' does not exist`,
            });
        } else {
            res.status(200).json(volunteer);
        }
    } catch (error) {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while retrieving volunteer by id : ${error}`,
        });
    }
};

export const addVolunteer = async (req: Request, res: Response) => {
    try {
        const volunteer = await addVolunteerService(req.body);

        res.status(201).json(volunteer);
    } catch (error) {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while adding volunteer : ${error} `,
        });
    }
};

export const updateVolunteer = async (req: Request, res: Response) => {
    try {
        const volunteerId = String(req.params.id);
        const volunteer = await updateVolunteerService(volunteerId, req.body);
        if (!volunteer) {
            res.status(404).json({
                error_code: "VOLN301",
                message: "Volunteer not found",
                details: `Volunteer with ID '${volunteerId}' does not exist`,
            });
        } else {
            res.status(200).json(volunteer);
        }
    } catch (error) {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while updating volunteer : ${error}`,
        });
    }
};

export const deleteVolunteer = async (req: Request, res: Response) => {
    try {
        const volunteerId: VolunteerFetch = { id: String(req.params.id) };
        const volunteer = await deleteVolunteerService(volunteerId);

        if (!volunteer) {
            res.status(404).json({
                error_code: "VOLN301",
                message: "Volunteer not found",
                details: `Volunteer with ID '${volunteerId}' does not exist`,
            });
        } else {
            res.status(200).send({ message: "Volunteer deleted!" });
        }
    } catch {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: "Error while retrieving deleting volunteer",
        });
    }
};
