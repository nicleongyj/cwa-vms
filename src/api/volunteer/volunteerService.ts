const volunteers = [
    { id: "uuid-1", name: "Yong Jing", email: "yongjingg@gmail.com" },
    { id: "uuid-2", name: "Zeyu", email: "zeyu@gmail.com" },
    { id: "uuid-3", name: "Jing", email: "jing@gmail.com" },
];

export const getAllVolunteersService = async () => {
    return volunteers;
};

export const getVolunteerService = async (volunteerId: string) => {
    const volunteer = volunteers.find((volunteer) => volunteer.id === volunteerId);
    return volunteer || null;
};

export const addVolunteerService = async (volunteer: {
    id: string;
    name: string;
    email: string;
}) => {
    const newVolunteerId = volunteer.id || `uuid-${volunteers.length + 1}`;
    const newVolunteer = { ...volunteer, id: newVolunteerId };
    volunteers.push(newVolunteer);
    return newVolunteer;
};

export const updateVolunteerService = async (
    volunteerId: string,
    volunteerData: { name?: string; email?: string },
) => {
    const volunteerIndex = volunteers.findIndex((volunteer) => volunteer.id === volunteerId);

    if (volunteerIndex === -1) {
        return null;
    }

    const updatedVolunteer = { ...volunteers[volunteerIndex], ...volunteerData };
    volunteers[volunteerIndex] = updatedVolunteer;
    return updatedVolunteer;
};

export const deleteVolunteerService = async (volunteerId: string) => {
    const volunteerIndex = volunteers.findIndex((volunteer) => volunteer.id === volunteerId);

    if (volunteerIndex === -1) {
        return null;
    }
    const deletedVolunteer = volunteers.splice(volunteerIndex, 1);

    return deletedVolunteer[0];
};

export const getVolunteersByNameService = async (nameQuery: string) => {
    return volunteers.filter((volunteer) => volunteer.name.toLowerCase().includes(nameQuery));
};
