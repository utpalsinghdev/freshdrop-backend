import { Request, Response } from 'express';
import {
    GetProfile,
    Profile
} from './user.services';
import { profileSchema } from './user.schema';


interface AuthenticatedRequest extends Request {
    number: string;
}



export const GetProfileController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const number = (req as AuthenticatedRequest).number;
        const user = await GetProfile(number);
        res.status(200).json({ message: 'User fetched successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
interface User {
    name: string;
    address: string;
    number: string;
}

export const updateDetailsController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { error } = profileSchema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        }
        const number = (req as AuthenticatedRequest).number;
        const userInput: User = {
            name: req.body.name,
            address: req.body.address,
            number
        }
        const user = await Profile(userInput);
        res.status(200).json({ message: 'Profile Updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
