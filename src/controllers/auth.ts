import { Request, Response } from 'express'
import { registerNewUser, loginUser, validateToken } from '../services/auth'

const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body)
  res.send(responseUser)
}

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body
  const responseUser = await loginUser({ email, password })

  if (responseUser === 'PASSWORD_INCORRECT') {
    res.status(403)
    res.send(responseUser)
  } else {
    res.send(responseUser)
  }
}

const verifyTokenCtrl = (req: Request, res: Response) => {
  try {
    const responseVerify = validateToken(req)
    res.status(200).send(responseVerify)
  } catch (error) {
    res.status(500).send({ error: 'Error al validar el token' })
  }
}

export { loginCtrl, registerCtrl, verifyTokenCtrl }
