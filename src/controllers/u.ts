import { Request, Response } from 'express'
import { UserModel } from '../models';

export const getUser = async (req: Request, res: Response) => {
    let { uid } = req.body

    const resp = await UserModel.getUser(uid);
    return res.status(resp.status).json(resp.body)
}

export const addUser = async (req: Request, res: Response) => {
    let { uname, email, phone_number, password, address } = req.body

    const resp = await UserModel.addUser(uname, email, phone_number, password, address);
    return res.status(resp.status).json(resp.body)
}

export const updateUser = async (req: Request, res: Response) => {
    let { uid, uname, phone_number, address } = req.body

    const resp = await UserModel.updateUser(uid, uname, phone_number, address);
    return res.status(resp.status).json(resp.body)
}

export const deleteuser = async (req: Request, res: Response) => {
    let { uid } = req.body

    const resp = await UserModel.deleteUser(uid);
    return res.status(resp.status).json(resp.body)
}
