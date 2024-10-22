import { z } from "zod";

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
    nric: z.number(),
    name: z.string(),
    email: z.string().email(),
});

export const GetUserSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
