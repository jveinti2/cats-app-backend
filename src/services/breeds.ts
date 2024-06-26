import 'dotenv/config'
import axios from 'axios'

const URI_CATS: string = 'https://api.thecatapi.com/v1'
const API_KEY: string = process.env.API_KEY || ''

const getAll = async () => {
  const { data } = await axios.get(`${URI_CATS}/breeds`)
  return data
}
const getImagesBreeds = async (search: string) => {
  const limit = 10
  const page = 0

  const { data } = await axios.get(`${URI_CATS}/images/search?limit=${limit}&page=${page}&breed_ids=${search}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })

  return data
}

const getBySearch = async (search: string) => {
  const { data } = await axios.get(`${URI_CATS}/breeds/search?q=${search}`)
  return data
}

export { getAll, getImagesBreeds, getBySearch }
