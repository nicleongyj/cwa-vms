import { Request, Response } from "express";
import { fetchUser, fetchAllUsers } from "./userService";

export const getUsers = async (req: Request, res: Response) => {
    const users = await fetchAllUsers();
    res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = String(req.params.id);
    const user = await fetchUser(userId);
    res.status(200).json(user);
};
