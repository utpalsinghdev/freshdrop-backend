import { RequestHandler } from "express";


export const healthCheck: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "server is running 🚀" })
    } catch (error) {
        next(error);
    }
}