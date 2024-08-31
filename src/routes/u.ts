import express, { Router } from "express"
import { addUser, deleteuser, getUser, updateUser } from "../controllers"

const BASE_ROUTE: string = '/u'
const router: Router = express.Router()

router.post('/get', getUser)
router.post('/', addUser)
router.put('/', updateUser)
router.delete('/', deleteuser)

export default { BASE_ROUTE, router }
