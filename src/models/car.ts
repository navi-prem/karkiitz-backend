import pool from '../../db'
import { Cars } from '../queries'

export default {
    getCars: async (uid: string) => {
        try {
            const { rows: cars } = await pool.query(Cars.getCars, [uid])
            return { status: 200, body: { message: "Cars fetched successfully.", statusCode: 200, cars } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to fetch cars.", statusCode: 400, err } }
        }
    },

    getCar: async (cid: string) => {
        try {
            const { rows: car } = await pool.query(Cars.getCar, [cid])
            return { status: 200, body: { message: "Car details fetched successfully.", statusCode: 200, car: car[0] } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to fetch car details.", statusCode: 400, err } }
        }
    },

    deleteCar: async (cid: string) => {
        try {
            await pool.query(Cars.deleteCar, [cid])
            return { status: 200, body: { message: "Car removed successfully.", statusCode: 200 } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to remove car.", statusCode: 400, err } }
        }
    },

    addCar: async (uid: string, make: string, model: string, year: number, license_plate: string) => {
        try {
            const { rows: car } = await pool.query(Cars.addCar, [uid, make, model, year, license_plate])
            return { status: 200, body: { message: "Car added successfuully.", statusCode: 200, cid: car[0].cid } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to add car.", statusCode: 400, err } }
        }
    },
}
