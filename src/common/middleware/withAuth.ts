import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/authRequest";


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

    const headers = new Headers();
    headers.append("Authorization", authHeader);
    const options = {
         method: "GET",
         headers: headers
    };
    const graphEndpoint = "https://graph.microsoft.com/v2.0/me";
    try {
      const response = await fetch(graphEndpoint, options);
      req.user = await response.json();
    } catch (error) {
        console.error(`[auth] ${error}`);
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }

    next();
};
