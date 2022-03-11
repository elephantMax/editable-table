import Table from '../models/Table'

class TableService {
  static async getAll() {
    return await Table.find({}).lean()
  }

  static async get() {
    return await Table.findOne()
  }

  static async create(table) {
    const newTable = new Table({
      ...table,
    })

    await newTable.save()

    return newTable
  }

  static async update(id, table) {
    await Table.findByIdAndUpdate(id, table)

    return await Table.findById(id)
  }
}

export default TableService
