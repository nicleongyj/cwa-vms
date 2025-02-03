import { z } from "zod";

// Define Enums using Zod
export const VolunteerDurationEnum = z.enum(["AD_HOC", "LONG_TERM", "SHORT_TERM"]);
export const VolunteerInterestEnum = z.enum(["BEFRIENDER", "EVENT_SUPPORT", "FUNDRAISER"]);

export const VolunteerSchema = z.object({
    // TODO: change id to uuid
    end_user_id: z.string(),
    languages_spoken: z.string().optional(),
    education: z.string().optional(),
    duration: VolunteerDurationEnum,
    interest: z.string(),
    availability: z.string().optional(),
    expertise: z.string().optional(),
    volunteering_hours: z.number().optional(),
    past_experience: z.boolean().default(false),
});

export const UpdateVolunteerSchema = z.object({
    languages_spoken: z.string().optional(),
    education: z.string().optional(),
    duration: VolunteerDurationEnum,
    interest_id: z.string(),
    availability: z.string().optional(),
    expertise: z.string().optional(),
    volunteering_hours: z.number().optional(),
    past_experience: z.boolean().default(false),
});

export const UpdateVolunteerRequest = z.object({
    languages_spoken: z.string().optional(),
    education: z.string().optional(),
    duration: VolunteerDurationEnum,
    interest: z.string(),
    availability: z.string().optional(),
    expertise: z.string().optional(),
    volunteering_hours: z.number().optional(),
    past_experience: z.boolean().default(false),
});

export type Volunteer = z.infer<typeof VolunteerSchema>;
export type VolunteerUpdate = z.infer<typeof UpdateVolunteerRequest>;
export type VolunteerUpdateSchema = z.infer<typeof UpdateVolunteerSchema>;

export const UpdateVolunteer = UpdateVolunteerSchema.partial();

export const VolunteerId = z.object({
    id: z.string(),
});

export type VolunteerFetch = z.infer<typeof VolunteerId>;
export type VolunteerDelete = z.infer<typeof VolunteerId>;
