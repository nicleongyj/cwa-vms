import { PrismaClient } from "@prisma/client";
import { VolunteerSchema, Volunteer, GetVolunteerId, VolunteerFetch } from "./volunteerModel";

const prisma = new PrismaClient();

// const volunteers = [
//     { id: "uuid-1", name: "Yong Jing", email: "yongjingg@gmail.com" },
//     { id: "uuid-2", name: "Zeyu", email: "zeyu@gmail.com" },
// ];

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
        GetVolunteerId.parse(volunteerId);

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

// export const updateVolunteerService = async (
//     volunteerId: string,
//     volunteerData: { name?: string; email?: string },
// ) => {
//     const volunteerIndex = volunteers.findIndex((volunteer) => volunteer.id === volunteerId);

//     if (volunteerIndex === -1) {
//         return null;
//     }

//     const updatedVolunteer = { ...volunteers[volunteerIndex], ...volunteerData };
//     volunteers[volunteerIndex] = updatedVolunteer;
//     return updatedVolunteer;
// };

// export const deleteVolunteerService = async (volunteerId: string) => {
//     const volunteerIndex = volunteers.findIndex((volunteer) => volunteer.id === volunteerId);

//     if (volunteerIndex === -1) {
//         return null;
//     }
//     const deletedVolunteer = volunteers.splice(volunteerIndex, 1);

//     return deletedVolunteer[0];
// };
