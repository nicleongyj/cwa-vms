let donors = [
    { donor_id: "uuid-1", frequency: "ONE_TIME", end_user_id: "user-1" },
    { donor_id: "uuid-2", frequency: "MONTHLY", end_user_id: "user-2" },
    { donor_id: "uuid-3", frequency: "YEARLY", end_user_id: "user-3" },
];

export const getAllDonorsService = async () => {
    return donors;
};

export const getDonorService = async (donorId: string) => {
    const donor = donors.find((donor) => donor.donor_id === donorId);
    return donor || null;
};

export const addDonorService = async (donor: {
    donor_id: string;
    frequency: string;
    end_user_id: string;
}) => {
    const newDonorId = donor.donor_id || `uuid-${donors.length + 1}`;
    const newDonor = { ...donor, donor_id: newDonorId };
    donors.push(newDonor);
    return newDonor;
};

export const updateDonorService = async (
    donorId: string,
    donorData: { frequency?: string; end_user_id?: string },
) => {
    const donorIndex = donors.findIndex((donor) => donor.donor_id === donorId);

    if (donorIndex === -1) {
        return null;
    }

    const updatedDonor = { ...donors[donorIndex], ...donorData };
    donors[donorIndex] = updatedDonor;

    return updatedDonor;
};

export const deleteDonorService = async (donorId: string) => {
    const donorIndex = donors.findIndex((donor) => donor.donor_id === donorId);

    if (donorIndex === -1) {
        return null;
    }
    const deletedDonor = donors.splice(donorIndex, 1);

    return deletedDonor[0];
};
