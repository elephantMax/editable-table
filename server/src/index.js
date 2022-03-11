import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

import config from '../config'

import TableRouter from './router/table'
import insertTable from './helpers/insertTable'
import TableService from './services/tableService'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/table', TableRouter)

const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

httpServer.listen(config.port, async () => {
  await mongoose.connect(config.mongoDB)
  console.log('successfully connected to mongoDb')

  console.log(`app successfully started on ${config.port}`)

  await insertTable()
  console.log(`table successfully inserted`)

  io.on('connection', (socket) => {
    socket.on('update', async (data) => {
      const { _id: id, ...table } = data
      await TableService.update(id, table)
      socket.broadcast.emit('update')
    })
    console.log('socket connected')
  })
})
