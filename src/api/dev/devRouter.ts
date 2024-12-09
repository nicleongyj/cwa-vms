import { Router } from "express";
import withAuth from "../../common/middleware/withAuth";
import { getSamplePrivateResource } from "./devController";

const route = Router();

export default (app: Router) => {
    app.use("/dev", route);

    route.get("/temp-private-resource", withAuth, getSamplePrivateResource);
};
