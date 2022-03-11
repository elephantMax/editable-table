import { config } from 'dotenv'

config()

const { PORT, mongoDB } = process.env

export default {
  port: PORT,
  mongoDB,
}
