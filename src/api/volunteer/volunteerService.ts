export const getVolunteerService = async (volunteerId: string) => {
    if (volunteerId === "uuid-1") {
        return { id: "uuid-1", name: "Yong Jing", email: "yongjing@gmail.com" };
    }
    return { id: "uuid-2", name: "Zeyu", email: "zeyu@gmail.com" };
};

export const getAllVolunteersService = async () => {
    return [
        { id: "uuid-1", name: "Yong Jing", email: "yongjingg@gmail.com" },
        { id: "uuid-2", name: "Zeyu", email: "zeyu@gmail.com" },
    ];
};

export const addVolunteerService = async (volunteer: {
    id: string;
    name: string;
    email: string;
}) => {
    return volunteer;
};

export const updateVolunteerService = async () => {
    // TODO
};

export const deleteVolunteerService = async (volunteerId: string) => {
    if (volunteerId === "uuid-1") {
        return { id: "uuid-1", name: "Yong Jing", email: "yongjing@gmail.com" };
    }
    return { id: "uuid-2", name: "Zeyu", email: "zeyu@gmail.com" };
};
