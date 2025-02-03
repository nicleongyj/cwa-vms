import {
    VolunteerSchema,
    Volunteer,
    VolunteerId,
    VolunteerFetch,
    VolunteerUpdate,
    VolunteerDelete,
    UpdateVolunteerSchema,
    UpdateVolunteerRequest,
} from "./volunteerModel";
import { z } from "zod";
import prisma from "../../common/utils/prisma";

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

        // Check if the volunteer interest already exists
        let volunteerInterest = await prisma.volunteerInterest.findUnique({
            where: { name: validatedData.interest },
        });

        // If not found, create a new interest entry
        if (!volunteerInterest) {
            volunteerInterest = await prisma.volunteerInterest.create({
                data: { name: validatedData.interest },
            });
            console.log("New Volunteer Interest Created:", volunteerInterest);
        }

        // Create volunteer in the database
        const newVolunteer = await prisma.volunteer.create({
            data: {
                end_user_id: validatedData.end_user_id,
                languages_spoken: validatedData.languages_spoken,
                education: validatedData.education,
                duration: validatedData.duration,
                interest_id: volunteerInterest.id, // Attach interest_id instead of name
                availability: validatedData.availability,
                expertise: validatedData.expertise,
                volunteering_hours: validatedData.volunteering_hours,
                past_experience: validatedData.past_experience,
            },
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
        const validatedData = UpdateVolunteerRequest.parse(volunteerData);

        console.log(validatedData);

        // Check if the volunteer exists in the database
        const existingVolunteer = await prisma.volunteer.findUnique({
            where: { volunteer_id: validId },
        });

        if (!existingVolunteer) {
            throw new Error(`Volunteer with ID '${validId}' not found.`);
        }

        const {
            interest,
            ...updatedData
        }: { interest?: string } & Partial<z.infer<typeof UpdateVolunteerSchema>> = validatedData;

        // If interest is provided, check if it exists or create a new one
        if (validatedData.interest) {
            let volunteerInterest = await prisma.volunteerInterest.findUnique({
                where: { name: interest },
            });

            // Create new VolunteerInterest if not found
            if (!volunteerInterest) {
                volunteerInterest = await prisma.volunteerInterest.create({
                    data: { name: interest },
                });
                console.log("New Volunteer Interest Created:", volunteerInterest);
            }

            // Attach interest_id to updatedData instead of the interest name
            updatedData.interest_id = volunteerInterest.id;
            console.log("After update interest id");
            console.log(updatedData);
        }

        // Perform the update
        const updatedVolunteer = await prisma.volunteer.update({
            where: { volunteer_id: validId },
            data: updatedData,
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
