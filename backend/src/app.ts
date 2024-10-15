import express, { Request, Response } from "express";
import { router } from "./Routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((error: Error, request: Request, response: Response) => {
    if(error instanceof Error) {
        return response.json({
            error: error.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});


export { app };
