import { Router } from "express";

import { confirmAuth } from "./authController";

const route = Router();

export default (app: Router) => {
    app.use("/auth", route);

    route.get("/confirm", confirmAuth);
};
