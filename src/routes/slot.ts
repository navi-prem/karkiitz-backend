import express, { Router } from "express"
import { deleteSlot, deleteSlots, getSlots, initialize } from "../controllers"

const BASE_ROUTE: string = '/slot'
const router: Router = express.Router()

router.get('/', getSlots)
router.delete('/slot', deleteSlot)
router.delete('/', deleteSlots)
router.post('/', initialize)

export default { BASE_ROUTE, router }
