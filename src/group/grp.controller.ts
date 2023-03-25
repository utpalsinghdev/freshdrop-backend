import { Request, Response } from 'express';
import {
    AllGroups,
    CreateNewGroup,
    DeleteGroup,
    addMultipleUsersToGroupByIds,
    addOneUserToGroup,
    getSingleGroup
} from './grp.services';
import { SingleSchema, multiSchema } from './grp.schema';
import { getUserById } from '../User/user.services';


export const CreateGroupController = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const group = await CreateNewGroup(name);
        res.status(200).json({ message: 'Group created successfully', group });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const AllGroupsController = async (req: Request, res: Response) => {
    try {
        const groups = await AllGroups();
        res.status(200).json({ message: 'Groups fetched successfully', groups });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getSingleGroupController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const group = await getSingleGroup(id);
        if (!group) return res.status(400).json({ message: 'Group not found' });
        res.status(200).json({ message: 'Group fetched successfully', group });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const AddSingleUserToGroup = async (req: Request, res: Response) => {
    try {
        const { userId, Group_id } = req.body;

        const { error } = SingleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const user = await getUserById(userId);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const group = await getSingleGroup(Group_id);
        if (!group) {
            return res.status(400).json({ message: 'Group not found' });
        }

        const updatedGroup = await addOneUserToGroup(userId, Group_id);
        res.status(200).json({ message: 'User added to group successfully', updatedGroup });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'Invalid id missing' });
        }
        const group = await getSingleGroup(id);
        if (!group) {
            return res.status(400).json({ message: 'Group not found' });
        }
        const deletedGroup = await DeleteGroup(id);
        res.status(200).json({ message: 'Group deleted successfully', deletedGroup });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const addManyUsersToGroup = async (req: Request, res: Response) => {
    try {
        const { userIds, Group_id } = req.body;
        const { error } = multiSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const group = await getSingleGroup(Group_id);
        if (!group) {
            return res.status(400).json({ message: 'Group not found' });
        }

        const updatedGroup = await addMultipleUsersToGroupByIds(userIds, Group_id);
        res.status(200).json({ message: 'Users added to group successfully', updatedGroup });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
