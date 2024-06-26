import { Router } from 'express'
import { loginCtrl, registerCtrl, verifyTokenCtrl } from '../controllers/auth'

const router = Router()
router.post('/register', registerCtrl)
router.post('/login', loginCtrl)
router.get('/verify', verifyTokenCtrl)

export { router }
