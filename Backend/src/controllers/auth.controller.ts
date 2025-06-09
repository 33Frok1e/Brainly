import { Request, Response } from "express";
import { RegisterInput } from "../utils/validations";

export const registerUserController = async (req: Request, res: Response) => {
    try {

        const { email, username, password }: RegisterInput = req.body
        // const { token, user } = registerUserService(email, username, password);

    } catch(e) {
        console.error(`Registration error: ${e}`);
        res.status(500).json({ message: 'Registration Failed!'})
    }
};

export const loginUserController = (req: Request, res: Response) => {
    console.log("login successfully !")
};

export const logoutUserController = (req: Request, res: Response) => {
    console.log("logout successfully !")
}