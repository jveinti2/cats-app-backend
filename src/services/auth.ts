import { Auth } from '../interfaces/auth.interface'
import { User } from '../interfaces/user.interface'
import UserModel from '../models/user'
import { encrypt, verified } from '../utils/bcrypt.handle'
import { generateToken, verifyToken } from '../utils/jwt.handle'

const registerNewUser = async ({ email, password, name }: User) => {
  const checkIs = await UserModel.findOne({ email })
  if (checkIs) return 'ALREADY_USER'
  const passHash = await encrypt(password) //TODO 12345678
  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    name,
  })
  //TODO 123456
  return registerNewUser
}

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email })
  if (!checkIs) return 'NOT_FOUND_USER'

  const passwordHash = checkIs.password //TODO el encriptado!
  const isCorrect = await verified(password, passwordHash)

  if (!isCorrect) return 'PASSWORD_INCORRECT'

  const token = generateToken(checkIs.email)
  const data = {
    token,
    user: checkIs,
  }
  return data
}

const validateToken = (req: any) => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]
  const verify = verifyToken(token)
  return verify
}

export { registerNewUser, loginUser, validateToken }
