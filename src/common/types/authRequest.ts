import { Request } from "express";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        displayName?: string;
        givenName?: string;
        mail?: string;
        userPrincipalName?: string;
    };
}
