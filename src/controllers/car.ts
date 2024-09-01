import { Request, Response } from 'express'
import { CarModel } from '../models';

export const getCars = async (req: Request, res: Response) => {
    const { uid } = req.body

    const resp = await CarModel.getCars(uid)
    return res.status(resp.status).json(resp.body)
}

export const getCar = async (req: Request, res: Response) => {
    const { cid } = req.body

    const resp = await CarModel.getCar(cid)
    return res.status(resp.status).json(resp.body)
}

export const addCar = async (req: Request, res: Response) => {
    const { uid, make, model, year, license_plate } = req.body

    const resp = await CarModel.addCar(uid, make, model, year, license_plate)
    return res.status(resp.status).json(resp.body)
}

export const deleteCar = async (req: Request, res: Response) => {
    const { cid } = req.body

    const resp = await CarModel.deleteCar(cid);
    return res.status(resp.status).json(resp.body)
}
