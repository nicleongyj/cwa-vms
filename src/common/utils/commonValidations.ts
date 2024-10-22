import { z } from "zod";

export const commonValidations = {
    nric: z.string().length(4),
};
