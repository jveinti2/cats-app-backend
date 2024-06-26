import { Request, Response, Router } from 'express'
import { getAllBreeds, getImagesBreedsBySearch, getBreedsBySearch } from '../controllers/breeds'
import { logMiddleware } from '../middleware/log'

const router = Router()

router.get('/', getAllBreeds)
router.post('/images', getImagesBreedsBySearch)
router.post('/search', getBreedsBySearch)

export { router }
