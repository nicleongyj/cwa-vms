import { Request, Response } from "express";
import {
    getVolunteerService,
    getAllVolunteersService,
    addVolunteerService,
    deleteVolunteerService,
    updateVolunteerService,
    getVolunteersByNameService,
} from "./volunteerService";

export const getVolunteers = async (req: Request, res: Response) => {
    try {
        const volunteers = await getAllVolunteersService();
        res.status(200).json(volunteers);
    } catch {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: "Error while retrieving all volunteer data",
        });
    }
};

export const getVolunteerById = async (req: Request, res: Response) => {
    try {
        const volunteerId = String(req.params.id);
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
    } catch {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: "Error while retrieving volunteer by id",
        });
    }
};

export const addVolunteer = async (req: Request, res: Response) => {
    try {
        const volunteer = await addVolunteerService(req.body);
        res.status(201).json(volunteer);
    } catch {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: "Error while retrieving adding volunteer",
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
    } catch {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: "Error while retrieving updating volunteer",
        });
    }
};

export const deleteVolunteer = async (req: Request, res: Response) => {
    try {
        const volunteerId = String(req.params.id);
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

export const searchVolunteer = async (req: Request, res: Response) => {
    try {
        const nameQuery = String(req.query.name || "").toLowerCase();
        if (!nameQuery) {
            res.status(400).json({
                error_code: "VOLN401",
                message: "Name query parameter is required",
                details: "Please provide a 'name' query parameter",
            });
        }

        const volunteers = await getVolunteersByNameService(nameQuery);
        res.status(200).json(volunteers);
    } catch {
        res.status(500).json({
            error_code: "VOLN201",
            message: "Unexpected server error, please contact support for help",
            details: "Error while retrieving deleting volunteer",
        });
    }
};
