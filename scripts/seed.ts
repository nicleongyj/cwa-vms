import {
    PrismaClient,
    DonationFrequency,
    VolunteerInterest,
    VolunteerDuration,
} from "@prisma/client";
import data from "../scripts/data.json";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

async function seed() {
    try {
        console.log("Seeding general users...");
        const generalUsers = await Promise.all(
            data.generalUsers.map((user) =>
                prisma.generalUser.upsert({
                    where: { email: user.email },
                    update: {},
                    create: {
                        ...user,
                        created_at: new Date(),
                    },
                }),
            ),
        );

        console.log("Seeding end users...");
        const endUsers = await Promise.all(
            data.endUsers.map((endUser) =>
                prisma.endUser.upsert({
                    where: { general_user_id: generalUsers[endUser.generalUserIndex].user_id },
                    update: {},
                    create: {
                        contact_number: endUser.contact_number,
                        dob: endUser.dob ? new Date(endUser.dob) : null,
                        general_user_id: generalUsers[endUser.generalUserIndex].user_id,
                        address: endUser.address || null,
                        nationality: endUser.nationality || null,
                        ethnicity: endUser.ethnicity || null,
                        gender: endUser.gender || null,
                        occupation: endUser.occupation || null,
                        created_at: new Date(),
                    },
                }),
            ),
        );

        console.log("Seeding donors...");
        await Promise.all(
            data.donors.map((donor) =>
                prisma.donor.create({
                    data: {
                        frequency: donor.frequency as DonationFrequency,
                        end_user: {
                            connect: { end_user_id: endUsers[donor.endUserIndex].end_user_id },
                        },
                    },
                }),
            ),
        );

        console.log("Seeding volunteers...");
        await Promise.all(
            data.volunteers.map((volunteer) =>
                prisma.volunteer.create({
                    data: {
                        interest: volunteer.interest as VolunteerInterest,
                        duration: volunteer.duration as VolunteerDuration,
                        end_user: {
                            connect: { end_user_id: endUsers[volunteer.endUserIndex].end_user_id },
                        },
                    },
                }),
            ),
        );

        console.log("Seeding staff...");
        await Promise.all(
            data.staff.map((staffMember) =>
                prisma.staff.upsert({
                    where: { general_user_id: generalUsers[staffMember.generalUserIndex].user_id },
                    update: {},
                    create: {
                        general_user_id: generalUsers[staffMember.generalUserIndex].user_id,
                    },
                }),
            ),
        );

        console.log("Seeding completed!");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
