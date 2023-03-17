import * as userModel from './user.model';

export const GetUser = async (number: string) => {
    const user = await userModel.checkUser(number);
    return user;
}

export const CreateUser = async (number: string) => {
    const user = await userModel.CreateUser(number);
    return user;
}

export const GetProfile = async (number: string) => {
    const user = await userModel.getProfile(number);
    return user;
}

export const Profile = async (userInput: any) => {
    const user = await userModel.profile(userInput);
    return user;
}