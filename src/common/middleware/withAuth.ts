import { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export default (req: CustomRequest, res: Response, next: NextFunction): void => {
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

    let user: JwtPayload | string;
    try {
        user = jwt.verify(token, config?.supabase?.jwtSecret ?? "");
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
    req.user = user;

    next();
};
