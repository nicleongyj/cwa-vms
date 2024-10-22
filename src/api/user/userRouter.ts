import { Router } from "express";
import withAuth from "../../common/middleware/withAuth";
import { withRequestParamsValidation } from "../../common/middleware/withRequestValidation";
import { getUsers, getUserById } from "./userController";
import { GetUserSchema } from "./userModel";

const route = Router();

export default (app: Router) => {
    app.use("/user", route);

    route.get("/", getUsers);
    route.get("/:id", withAuth, withRequestParamsValidation(GetUserSchema), getUserById);
};
