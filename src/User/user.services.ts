import * as userModel from './user.model';

export const GetUser = async (number: string) => {
    const user = await userModel.checkUser(number);
    return user;
}

export const CreateUser = async (number: string) => {
    const user = await userModel.CreateUser(number);
    return user;
}
