import { Request, Response } from "express";
import {
    getDonorService,
    getAllDonorsService,
    addDonorService,
    updateDonorService,
    deleteDonorService,
} from "./donorService";
import { DonorSchema } from "./donorModel";
import { z } from "zod";

const createErrorResponse = (errorCode: string, message: string, details: string) => ({
    error_code: errorCode,
    message,
    details,
});

export const getDonors = async (req: Request, res: Response) => {
    console.log("Retrieving donors");
    try {
        const donors = await getAllDonorsService();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json(
            createErrorResponse(
                "DNR201",
                "Unexpected server error, please contact support for help",
                "Error while retrieving all donor data",
            ),
        );
    }
};

export const getDonorById = async (req: Request, res: Response) => {
    const donorId = String(req.params.id);

    try {
        const donor = await getDonorService(donorId);
        if (!donor) {
            res.status(404).json(
                createErrorResponse(
                    "DNR301",
                    "Donor not found",
                    `Donor with ID '${donorId}' does not exist`,
                ),
            );
        } else {
            res.status(200).json(donor);
        }
    } catch (error) {
        res.status(500).json(
            createErrorResponse(
                "DNR201",
                "Unexpected server error, please contact support for help",
                "Error occurred while retrieving donor by ID",
            ),
        );
    }
};

export const addDonor = async (req: Request, res: Response) => {
    try {
        const validation = DonorSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json(
                createErrorResponse(
                    "DNR402",
                    "Invalid input format",
                    "Invalid input format when adding donor",
                ),
            );
        } else {
            const donor = await addDonorService(req.body);
            res.status(201).json(donor);
        }
    } catch (error) {
        console.log("error");
        res.status(500).json(
            createErrorResponse(
                "DNR201",
                "Unexpected server error, please contact support for help",
                "Error occurred while adding donor",
            ),
        );
    }
};

export const updateDonor = async (req: Request, res: Response) => {
    const donorId = String(req.params.id);

    try {
        const validation = DonorSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json(
                createErrorResponse("DNR402", "Invalid input format", validation.error.message),
            );
        }

        const donor = await updateDonorService(donorId, req.body);
        if (!donor) {
            console.log("missing donor");
            res.status(404).json(
                createErrorResponse(
                    "DNR301",
                    "Donor not found",
                    `Donor with ID '${donorId}' does not exist`,
                ),
            );
        } else {
            res.status(200).json(donor);
        }
    } catch (error) {
        res.status(500).json(
            createErrorResponse(
                "DNR201",
                "Unexpected server error, please contact support for help",
                "Error occurred while updating donor",
            ),
        );
    }
};

export const deleteDonor = async (req: Request, res: Response) => {
    const donorId = String(req.params.id);

    try {
        const donor = await deleteDonorService(donorId);
        if (!donor) {
            res.status(404).json(
                createErrorResponse(
                    "DNR301",
                    "Donor not found",
                    `Donor with ID '${donorId}' does not exist`,
                ),
            );
        } else {
            res.status(200).send({ message: "Donor deleted!" });
        }
    } catch (error) {
        res.status(500).json(
            createErrorResponse(
                "DNR201",
                "Unexpected server error, please contact support for help",
                "Error occurred while deleting donor",
            ),
        );
    }
};
