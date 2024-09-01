import pool from '../../db'
import { Slots } from '../queries'

export default {
    createSlots: async (date: Date) => {
        const client = await pool.connect()

        try {
            await client.query('BEGIN');
            console.log(Slots.createSlots)
            await client.query(Slots.createSlots, [date])

            await client.query('COMMIT');
            client.release();
            return { status: 200, body: { message: "Slots created successfully", statusCode: 200 } }
        } catch (err) {
            console.log(err)
            await client.query('ROLLBACK');
            client.release();
            return { status: 400, body: { message: "Failed to create slots.", statusCode: 400, err } }
        }
    },

    deleteSlots: async (date: Date) => {
        try {
            await pool.query(Slots.deleteSlots, [date])
            return { status: 200, body: { message: "Slots booked successfully.", statusCode: 200, } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to delete slots.", statusCode: 400, err } }
        }
    },

    deleteSlot: async (sid: string) => {
        try {
            await pool.query(Slots.deleteSlot, [sid])
            return { status: 200, body: { message: "Slot deleted successfully.", statusCode: 200, } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to delete slot.", statusCode: 400, err } }
        }
    },

    getSlots: async () => {
        try {
            const { rows: slots } = await pool.query(Slots.getSlots)
            return { status: 200, body: { message: "Slots fetched successfully.", statusCode: 200, slots } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to fetch slots.", statusCode: 400, err } }
        }
    }
}
