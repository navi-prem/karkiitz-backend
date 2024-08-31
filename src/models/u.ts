import pool from '../../db'
import { Users } from '../queries'

export default {
    getUser: async (uid: string) => {
        try {
            const { rows } = await pool.query(Users.getUser, [uid])
            return { status: 200, body: { message: "User fetched successfully.", statusCode: 200, rows } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to fetch user.", statusCode: 400, err } }
        }
    },

    addUser: async (uname: string, email: string, phone_number: number, password: string, address: string) => {
        try {
            const { rows } = await pool.query(Users.addUser, [uname, email, phone_number, password, address])
            return { status: 200, body: { message: "User created successfully.", statusCode: 200, user: rows[0] } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to create user.", statusCode: 400, err } }
        }
    },

    updateUser: async (uid: string, uname: string, phone_number: number, address: string) => {
        try {
            await pool.query(Users.updateUser, [uid, uname, phone_number, address])
            return { status: 200, body: { message: "User updated successfully.", statusCode: 200 } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to update user.", statusCode: 400, err } }
        }
    },

    deleteUser: async (uid: string) => {
        try {
            await pool.query(Users.deleteUser, [uid])
            return { status: 200, body: { message: "User deleted successfully.", statusCode: 200 } }
        } catch (err) {
            return { status: 400, body: { message: "Failed to delete user.", statusCode: 400, err } }
        }
    },
}
