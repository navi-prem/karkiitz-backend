import pool from '../../db'
import { Bookings, Slots } from '../queries'

export default {
    bookSlot: async (uid: string, cid: string, sid: string, pickup_address: string) => {
        const client = await pool.connect()

        try {
            await client.query('BEGIN');
            await client.query(Slots.markAsBooked, [sid])
            const { rows: bookings, rowCount } = await client.query(Bookings.addBooking, [uid, cid, sid, pickup_address])
            if (rowCount == 0) throw new Error('Slot is alraady booked or doesn\'t exist')

            await client.query('COMMIT');
            client.release();
            return { status: 200, body: { message: "Slot booked successfully.", statusCode: 200, bid: bookings[0].bid } }
        } catch (err) {
            await client.query('ROLLBACK');
            client.release();
            return { status: 400, body: { message: "Failed to book slot.", statusCode: 400, err } }
        }
    },

}

