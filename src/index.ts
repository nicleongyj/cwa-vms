import express, { Express, Request, Response } from "express";
import cors from "cors";

import { handleSingpassCallback } from "./api/auth/authController";
import api from "./api";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/callback", handleSingpassCallback);

app.use("/api/v1", api());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
