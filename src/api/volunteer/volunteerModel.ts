import { z } from "zod";

export type Volunteer = z.infer<typeof VolunteerSchema>;
export const VolunteerSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
});

export const GetVolunteerId = z.object({
    id: z.string(),
});
