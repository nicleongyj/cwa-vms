import { Router } from "express";
import userRouter from "./user/userRouter";
import authRouter from "./auth/authRouter";
import volunteerRouter from "./volunteer/volunteerRouter";

export default () => {
    const app = Router();
    authRouter(app);
    userRouter(app);
    volunteerRouter(app);

    return app;
};
