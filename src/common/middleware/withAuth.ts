import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/authRequest";
import axios, { isAxiosError } from "axios";

export default async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
    }
    const scheme = authHeader.split(" ")[0];
    if (scheme.toLocaleLowerCase() !== "bearer") {
        res.status(401).json({ message: 'Authorization scheme is not "Bearer"' });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Bearer token missing" });
        return;
    }

    const graphEndpoint = "https://graph.microsoft.com/v1.0/me";
    try {
        const response = await axios.get(graphEndpoint, { headers: { Authorization: authHeader } });
        req.user = await response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error(`[auth] Error fetching user: ${JSON.stringify(error.response?.data)}`);
        } else {
            console.error(`[auth] Error fetching user: ${error}`);
        }
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }

    next();
};
