import { VolunteerInterestSchema } from "./volunteerInterestModel";
import prisma from "../../common/utils/prisma";

export const getAllVolunteerInterestsService = async () => {
    try {
        const interests = await prisma.volunteerInterest.findMany();
        return interests;
    } catch (error) {
        console.error("Error in getAllVolunteerInterestsService:", error);
        throw new Error("Failed to fetch volunteer interests.");
    }
};

export const addVolunteerInterestService = async (interest: { name: string }) => {
    try {
        console.log("Received request to create volunteer interest:", interest);

        // Validate input using Zod
        const validatedData = VolunteerInterestSchema.parse(interest);
        console.log("Validated Data:", validatedData);

        // Create new interest in the database
        const newInterest = await prisma.volunteerInterest.create({
            data: validatedData,
        });

        console.log("Volunteer Interest Created Successfully:", newInterest);
        return newInterest;
    } catch (error) {
        console.error("Error in addVolunteerInterestService:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to create volunteer interest: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred while creating volunteer interest.");
        }
    }
};
