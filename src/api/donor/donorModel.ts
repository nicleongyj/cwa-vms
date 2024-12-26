import { z } from "zod";

export const DonationFrequencyEnum = z.enum(["ONE_TIME", "MONTHLY", "YEARLY"]);

export const DonorSchema = z.object({
    donor_id: z.string(),
    frequency: DonationFrequencyEnum,
    end_user_id: z.string(),
    donations: z
        .array(
            z.object({
                donation_id: z.string(),
                project_id: z.string(),
                amount: z.number(),
                payment_method: z.string().optional(),
                donation_date: z.string().optional(),
                tax_deduction: z.boolean().optional(),
            }),
        )
        .optional(), //Optional donations
});

export const GetDonorId = z.object({
    id: z.string(),
});
