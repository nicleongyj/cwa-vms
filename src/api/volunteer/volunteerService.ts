import { PrismaClient } from "@prisma/client";
import {
    VolunteerSchema,
    Volunteer,
    VolunteerId,
    VolunteerFetch,
    VolunteerUpdate,
    UpdateVolunteer,
    VolunteerDelete,
} from "./volunteerModel";
import { z } from "zod";

const prisma = new PrismaClient();

export const getAllVolunteersService = async () => {
    try {
        const volunteers = await prisma.volunteer.findMany();

        return volunteers;
    } catch (error) {
        console.error("Error in getAllVolunteersService:", error);
        throw new Error("Failed to fetch volunteers.");
    }
};

export const getVolunteerService = async (volunteerId: VolunteerFetch) => {
    try {
        // Validate input using Zod
        VolunteerId.parse(volunteerId);

        // Fetch volunteer from the database
        const volunteer = await prisma.volunteer.findUnique({
            where: { volunteer_id: volunteerId.id },
        });

        if (!volunteer) {
            throw new Error(`Volunteer with ID '${volunteerId}' not found.`);
        }

        return volunteer;
    } catch (error) {
        console.error("Error in getVolunteerService:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to fetch volunteer: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred while fetching volunteer.");
        }
    }
};

export const addVolunteerService = async (volunteer: Volunteer) => {
    try {
        console.log("Here - Received request to create volunteer:", volunteer);

        // Validate input using Zod
        const validatedData = VolunteerSchema.parse(volunteer);
        console.log("Validated Data:", validatedData);

        // Create volunteer in the database
        const newVolunteer = await prisma.volunteer.create({
            data: validatedData,
        });

        console.log("Volunteer Created Successfully:", newVolunteer);
        return newVolunteer;
    } catch (error) {
        console.error("Error in addVolunteerService:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to create volunteer: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred while creating volunteer.");
        }
    }
};

export const updateVolunteerService = async (
    volunteerId: string,
    volunteerData: Partial<VolunteerUpdate>, // Allows updating only some fields
) => {
    try {
        // Validate ID format
        const validId = z.string().uuid().parse(volunteerId);

        // Validate update data (must match the VolunteerSchema structure)
        const validatedData = UpdateVolunteer.parse(volunteerData);

        // Check if the volunteer exists in the database
        const existingVolunteer = await prisma.volunteer.findUnique({
            where: { volunteer_id: validId },
        });

        if (!existingVolunteer) {
            throw new Error(`Volunteer with ID '${validId}' not found.`);
        }

        // Perform the update
        const updatedVolunteer = await prisma.volunteer.update({
            where: { volunteer_id: validId },
            data: validatedData,
        });

        return updatedVolunteer;
    } catch (error) {
        console.error("Error in updateVolunteerService:", error);
        throw new Error(`Failed to update volunteer: ${error}`);
    }
};

export const deleteVolunteerService = async (volunteerId: VolunteerDelete) => {
    try {
        // Validate ID format
        const validId = VolunteerId.parse(volunteerId);

        // Check if the volunteer exists
        const existingVolunteer = await prisma.volunteer.findUnique({
            where: { volunteer_id: validId.id },
        });

        if (!existingVolunteer) {
            throw new Error(`Volunteer with ID '${validId}' not found.`);
        }

        // Delete the volunteer
        const deletedVolunteer = await prisma.volunteer.delete({
            where: { volunteer_id: validId.id },
        });

        return deletedVolunteer;
    } catch (error) {
        console.error("Error in deleteVolunteerService:", error);
        throw new Error(`Failed to delete volunteer: ${error}`);
    }
};
