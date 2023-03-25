import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import cors from "cors";
import testrou from "./test/test.routes";
import OtpRoutes from "./otp/otp.routes";
import userRoutes from "./User/user.routes";
import employeeRoutes from "./employee/employee.routes";
import grpRoute from "./group/grp.routes";
const app = express();
app.use(morgan("dev"))
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
})
);

app.use("/api/v1/test", testrou)
app.use("/api/otp", OtpRoutes)
app.use("/user", userRoutes)
app.use("/employee", employeeRoutes)
app.use("/group", grpRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint Not found"))
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});


export default app;
