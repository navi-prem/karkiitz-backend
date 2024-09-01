import { Request, Response } from 'express'
import { BookModel } from '../models';

export const book = async (req: Request, res: Response) => {
    const { uid, cid, sid, pickup_address } = req.body

    const resp = await BookModel.bookSlot(uid, cid, sid, pickup_address)
    return res.status(resp.status).json(resp.body)
}
