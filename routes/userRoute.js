import {registerController,login} from '../controllers/users.js'
import express from 'express'


const router = express.Router()

router.post('/register',registerController)
router.post('/login',login)

export default router