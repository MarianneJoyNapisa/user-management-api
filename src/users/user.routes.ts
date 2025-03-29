import express, { Request, Response } from "express";
import { UnitUser, User } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import * as database from "./user.database";

export const userRouter = express.Router();


userRouter.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide all the required parameters..." });
            return;
        }

        const user = await database.findEmail(email);

        if (user) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "This email has already been registered..." });
            return;
        }

        const newUser = await database.create(req.body);

        res.status(StatusCodes.CREATED).json({ newUser });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

userRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide all the required parameters..." });
            return;
        }

        const user = await database.findEmail(email);

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ error: "No user exists with the email provided..." });
            return;
        }

        const comparePassword = await database.comparePassword(email, password);

        if (!comparePassword) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Incorrect Password!" });
            return;
        }

        res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

userRouter.delete("/user/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        const user = await database.findOne(id);

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ error: "User does not exist" });
            return;
        }

        await database.remove(id);

        res.status(StatusCodes.OK).json({ msg: "User deleted" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
