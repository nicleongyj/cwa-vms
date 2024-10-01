import { Router } from "express";
import isAuth from "../middlewares/isAuth";

// temp apis for dev purposes

const route = Router();

export default (app: Router) => {
    app.use("/dev", route);

    route.get("/temp-private-resource", isAuth, async function (req, res) {
        res.json({ message: "Protected route resource", user: req.user });
    });
};
