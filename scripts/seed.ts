import { PrismaClient, UserRole, DonationFrequency } from "@prisma/client";
// UserRole and DonationaFrequency are enums
import data from "../scripts/data.json";
import dotenv from 'dotenv';


dotenv.config();

const prisma = new PrismaClient();

async function seed() {
    try {
        console.log("Seeding users...");
        const users = await Promise.all(
            data.users.map((user) =>
                prisma.users.create({
                    data: {
                        ...user,
                        role: user.role as UserRole,
                        dob: new Date(user.dob),
                    },
                }),
            ),
        );

        console.log("Seeding donors...");
        const donors = await Promise.all(
            data.donors.map((donor) =>
                prisma.donor.create({
                    data: {
                        entity: donor.entity,
                        frequency: donor.frequency as DonationFrequency,
                        users: {
                            connect: { user_id: users[donor.userIndex].user_id },
                        },
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
