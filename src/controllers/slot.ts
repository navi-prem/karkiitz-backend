import { Request, Response } from 'express'
import { SlotModel } from '../models';

export const initialize = async (req: Request, res: Response) => {
    const { date } = req.body

    const resp = await SlotModel.createSlots(date)
    return res.status(resp.status).json(resp.body)
}

export const deleteSlot = async (req: Request, res: Response) => {
    const { sid } = req.body

    const resp = await SlotModel.deleteSlot(sid)
    return res.status(resp.status).json(resp.body)
}

export const deleteSlots = async (req: Request, res: Response) => {
    const { date } = req.body

    const resp = await SlotModel.deleteSlots(date)
    return res.status(resp.status).json(resp.body)
}

export const getSlots = async (_: Request, res: Response) => {

    const resp = await SlotModel.getSlots()
    return res.status(resp.status).json(resp.body)
}
