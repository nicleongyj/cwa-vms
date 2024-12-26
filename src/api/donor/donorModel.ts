import { z } from "zod";

export const DonationFrequencyEnum = z.enum(["ONE_TIME", "MONTHLY", "YEARLY"]);

export const DonorSchema = z.object({
    donor_id: z.string(),
    frequency: DonationFrequencyEnum,
    end_user_id: z.string(),
});

export const GetDonorId = z.object({
    id: z.string(),
});
