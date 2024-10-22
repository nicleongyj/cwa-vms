import { Router } from "express";
import userRouter from "./user/userRouter";
import authRouter from "./auth/authRouter";

export default () => {
    const app = Router();
    authRouter(app);
    userRouter(app);

    return app;
};
