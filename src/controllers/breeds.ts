import { Request, Response } from 'express'
import { getAll, getImagesBreeds, getBySearch } from '../services/breeds'

import { handleHttp } from '../utils/error.handle'

const getAllBreeds = async (req: Request, res: Response) => {
  try {
    const breeds = await getAll()
    res.send(breeds)
  } catch (error) {
    handleHttp(res, 'Error en el servidor')
  }
}

const getImagesBreedsBySearch = async (req: Request, res: Response) => {
  const { breedId } = req.body
  try {
    const images = await getImagesBreeds(breedId)

    res.send(images)
  } catch (error) {
    handleHttp(res, 'Error en el servidor')
  }
}

const getBreedsBySearch = async (req: Request, res: Response) => {
  const { search } = req.body
  try {
    const breeds = await getBySearch(search)

    res.send(breeds)
  } catch (error) {
    handleHttp(res, 'Error en el servidor')
  }
}

export { getAllBreeds, getImagesBreedsBySearch, getBreedsBySearch }
