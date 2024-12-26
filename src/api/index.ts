import { Router } from "express";
import userRouter from "./user/userRouter";
import authRouter from "./auth/authRouter";
import donorRouter from "./donor/donorRouter";

export default () => {
    const app = Router();
    authRouter(app);
    userRouter(app);
    donorRouter(app);

    return app;
};
