import { getUserById } from "../User/user.services";
import { CreateGroup, addMultipleUsersToGroup, addSingleUserToGroup, deleteGroup, getGroup, AllGroups as grps } from "./grp.model";
export const CreateNewGroup = async (name: string) => {
    const group = await CreateGroup(name);
    return group;
}

export const AllGroups = async () => {
    const groups = await grps();
    return groups;
};

export const getSingleGroup = async (id: number) => {
    const group = await getGroup(id);
    return group;
}

export const addOneUserToGroup = async (userId: number, groupId: number) => {
    try {
        const updatedGroup = await addSingleUserToGroup(userId, groupId);
        return updatedGroup;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const addMultipleUsersToGroupByIds = async (userIds: number[], groupId: number) => {
    const userInputs = userIds.map((userId) => ({ userId }));
    const group = await addMultipleUsersToGroup(userInputs, groupId);
    return group;
};


export const DeleteGroup = async (id: number) => {
    const group = await deleteGroup(id);
    return group;
}