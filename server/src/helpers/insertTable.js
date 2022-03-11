import mongoose from 'mongoose'

const insertTable = async () => {
  const table = {
    keys: [
      {
        id: '1',
        text: 'Name',
      },
    ],
    values: [
      {
        1: 'Name',
      },
    ],
  }

  const isExtist = await mongoose.connection.collection('tables').findOne({})
  if (isExtist) {
    return
  }

  await mongoose.connection.collection('tables').insertOne(table)
}

export default insertTable
