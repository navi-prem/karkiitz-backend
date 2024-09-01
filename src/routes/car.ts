import express, { Router } from "express"
import { getCars, getCar, deleteCar, addCar } from "../controllers"

const BASE_ROUTE: string = '/car'
const router: Router = express.Router()

router.post('/get', getCars)
router.post('/get/car', getCar)
router.post('/', addCar)
router.delete('/', deleteCar)

export default { BASE_ROUTE, router }
