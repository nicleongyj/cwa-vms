import { Response } from "express";
import { AuthRequest } from "../../common/types/authRequest";

export const getSamplePrivateResource = async (req: AuthRequest, res: Response) => {
    const sampleResource = { message: "If u can see this, you have successfully logged in", user: req.user }
    res.status(200).json(sampleResource);
};
