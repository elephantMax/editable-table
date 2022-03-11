import mongoose, { Schema } from 'mongoose'

const Key = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    text: {
      type: String,
      unique: true,
    },
  },
  { _id: false }
)

const schema = new mongoose.Schema(
  {
    keys: [Key],
    values: [],
  },
  {
    versionKey: false,
  }
)

const Table = mongoose.model('Table', schema)

export default Table
