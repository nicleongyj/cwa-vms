type Donation = {
    donation_id: string;
    donor_id: string;
    project_id: string;
    amount: number;
    payment_method: string;
    donation_date: string;
    tax_deduction: boolean;
};

const donors = [
    {
        donor_id: "uuid-1",
        frequency: "ONE_TIME",
        end_user_id: "user-1",
        donations: [
            {
                donation_id: "donation-1",
                donor_id: "uuid-1",
                project_id: "project-1",
                amount: 100.0,
                payment_method: "Credit Card",
                donation_date: "2024-12-01",
                tax_deduction: true,
            },
        ],
    },
    {
        donor_id: "uuid-2",
        frequency: "MONTHLY",
        end_user_id: "user-2",
        donations: [
            {
                donation_id: "donation-2",
                donor_id: "uuid-2",
                project_id: "project-2",
                amount: 50.0,
                payment_method: "PayPal",
                donation_date: "2024-12-02",
                tax_deduction: false,
            },
        ],
    },
    {
        donor_id: "uuid-3",
        frequency: "YEARLY",
        end_user_id: "user-3",
        donations: [],
    },
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
    donations: Array<Donation>; // Add donations array
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
