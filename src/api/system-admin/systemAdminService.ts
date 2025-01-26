import {
    SystemAdmin,
    SystemAdminPermissions,
    CreateSystemAdminSchema,
    UpdatePermissionsSchema,
} from "./systemAdminModel";

// To check if need to update a db instead
const systemAdmins: SystemAdmin[] = [];

export const createSystemAdmin = async (data: SystemAdmin): Promise<SystemAdmin> => {
    const validatedData = CreateSystemAdminSchema.parse(data);

    // Check if admin already exists based on email ?
    const existingAdmin = systemAdmins.find((admin) => admin.email === validatedData.email);
    if (existingAdmin) {
        throw new Error("System admin with this email already exists");
    }

    const newAdmin: SystemAdmin = {
        ...data,
    };

    systemAdmins.push(newAdmin);
    return newAdmin;
};

export const updateSystemAdminPermissions = async (
    userId: string,
    permissions: SystemAdminPermissions,
): Promise<SystemAdmin> => {
    const validatedData = UpdatePermissionsSchema.parse({ userId, permissions });

    const adminIndex = systemAdmins.findIndex((admin) => admin.id === validatedData.userId);
    if (adminIndex === -1) {
        throw new Error("System admin not found");
    }

    systemAdmins[adminIndex] = {
        ...systemAdmins[adminIndex],
        permissions: validatedData.permissions,
    };

    return systemAdmins[adminIndex];
};

export const getAllSystemAdmins = async (): Promise<SystemAdmin[]> => {
    return systemAdmins;
};

export const getSystemAdmin = async (userId: string): Promise<SystemAdmin> => {
    const admin = systemAdmins.find((admin) => admin.id === userId);
    if (!admin) {
        throw new Error("System admin not found");
    }
    return admin;
};

export const deleteSystemAdmin = async (userId: string): Promise<void> => {
    const adminIndex = systemAdmins.findIndex((admin) => admin.id === userId);
    if (adminIndex === -1) {
        throw new Error("System admin not found");
    }

    systemAdmins.splice(adminIndex, 1);
};
