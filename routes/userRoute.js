import {registerController,login,verifyUser} from '../controllers/users.js'
import express from 'express'


const router = express.Router()

router.post('/register',registerController)
router.post('/login',login)
router.get('/',verifyUser )

export default router