import { Router } from "express";

import { confirmAuth, generateCodeChallenge, getPersonData, handleSingpassCallback } from "./authController";

const route = Router();

export default (app: Router) => {
    app.use("/auth", route);

    route.post("/generateCodeChallenge", generateCodeChallenge);
    route.post("/getPersonData", getPersonData);
    route.get("/confirm", confirmAuth);

};
