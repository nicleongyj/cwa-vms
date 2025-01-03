import { Router } from "express";
import userRouter from "./user/userRouter";
// import authRouter from "./auth/authRouter";
import volunteerRouter from "./volunteer/volunteerRouter";
import donorRouter from "./donor/donorRouter";
import devRouter from "./dev/devRouter";

export default () => {
    const app = Router();
    // authRouter(app);
    userRouter(app);
    volunteerRouter(app);
    donorRouter(app);
    devRouter(app);

    return app;
};
