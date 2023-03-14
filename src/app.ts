import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import createHttpError, {isHttpError} from "http-errors";
import morgan from "morgan";
import testrou from "./test/test.routes";
const app = express();
app.use(morgan("dev"))
app.use(express.json());



app.use("/api/v1/test", testrou)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint Not found"))
});

// app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
//     console.error(error);
//     let errorMessage = "An unknown error occurred!";
//     let errorCode = 500;
//     if (isHttpError(error)) {
//         errorMessage = error.message;
//         errorCode = error.status;
//     }
//     res.status(errorCode).json({ message: errorMessage })
// });

export default app;