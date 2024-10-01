import express, { Express, Request, Response } from "express";
import cors from "cors";

import api from "./api";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/api/v1", api());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
