import { z } from "zod";

export const SystemAdminPermissionsSchema = z.object({
    canViewDonors: z.boolean(),
    canEditDonors: z.boolean(),
    canViewUsers: z.boolean(),
    canManageUsers: z.boolean(),
    isSystemAdmin: z.boolean(),
});

export const SystemAdminSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z
        .string()
        .email()
        .refine((email) => email.endsWith("@cwa.gov.sg"), {
            message: "Email must be from CWA domain",
        }),
    permissions: SystemAdminPermissionsSchema,
    role: z.literal("SYSTEM_ADMIN"),
});

export type SystemAdmin = z.infer<typeof SystemAdminSchema>;
export type SystemAdminPermissions = z.infer<typeof SystemAdminPermissionsSchema>;

export const UpdatePermissionsSchema = z.object({
    userId: z.string(),
    permissions: SystemAdminPermissionsSchema,
});
