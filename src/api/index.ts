import { Router } from "express";
import auth from "./routes/auth";
import dev from "./routes/dev";

export default () => {
    const app = Router();
    auth(app);
    dev(app);

    return app;
};
