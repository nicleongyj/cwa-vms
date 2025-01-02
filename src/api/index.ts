import { Router } from "express";
import userRouter from "./user/userRouter";
// import authRouter from "./auth/authRouter";
import devRouter from "./dev/devRouter";

export default () => {
    const app = Router();
    // authRouter(app);
    userRouter(app);
    devRouter(app);

    return app;
};
