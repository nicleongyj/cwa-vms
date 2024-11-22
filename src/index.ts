import express, { Express, Request, Response } from "express";
import cors from "cors";

import api from "./api";

const app: Express = express();
const port = process.env.SERVER_PORT;

if (port === undefined) {
  throw new Error(`Env variable SERVER_PORT undefined`);
}

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/api/v1", api());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
