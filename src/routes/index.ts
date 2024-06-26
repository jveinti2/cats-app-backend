import { Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

const PATH_ROUTER = __dirname
const router = Router()

// Función para limpiar el nombre del archivo
const cleanFileName = (fileName: string) => {
  const file = fileName.split('.').shift()
  return file
}

// Lee de manera síncrona los archivos en el directorio PATH_ROUTER
readdirSync(PATH_ROUTER).forEach((fileName) => {
  const cleanName = cleanFileName(fileName)

  if (cleanName !== 'index') {
    // Importa y usa las rutas de manera síncrona
    const moduleRouter = require(join(PATH_ROUTER, fileName))
    router.use(`/${cleanName}`, moduleRouter.router)
  }
})

export { router }
