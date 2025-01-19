import { z } from "zod";

export const VolunteerSchema = z.object({
    end_user_id: z.string(),
    languages_spoken: z.string().optional(),
    education: z.string().optional(),
    duration: z.enum(["AD_HOC", "LONG_TERM", "SHORT_TERM"]),
    interest: z.enum(["BEFRIENDER", "EVENT_SUPPORT", "FUNDRAISER"]),
    availability: z.string().optional(),
    expertise: z.string().optional(),
    volunteering_hours: z.number().optional(),
    past_experience: z.boolean().default(false),
});

export type Volunteer = z.infer<typeof VolunteerSchema>;

export const GetVolunteerId = z.object({
    id: z.string(),
});

export type VolunteerFetch = z.infer<typeof GetVolunteerId>;
