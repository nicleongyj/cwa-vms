import { z } from "zod";

export const VolunteerInterestSchema = z.object({
    // TODO: change id to uuid
    id: z.string().optional(),
    name: z.string().min(1, "Interest name is required"),
});

export type VolunteerInterest = z.infer<typeof VolunteerInterestSchema>;
