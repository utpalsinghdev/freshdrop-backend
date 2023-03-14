import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const healthCheck: RequestHandler = async (req, res, next) => {
    try {
        

        res.status(200).json({ message: "server is running 🚀",  })
    } catch (error) {
        next(error);
    }
}