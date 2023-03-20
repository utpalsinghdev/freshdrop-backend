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

export const getAllUsers = async () => {
    const users = await userModel.getAllUsers();
    return users;
}
export const getUserById = async (id: number) => {
    const user = await userModel.getUserById(id);
    return user;
}
export const deleteUser = async (id: number) => {
    const user = await userModel.deleteUser(id);
    return user;
}

