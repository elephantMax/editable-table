import tableService from '../services/tableService'
import { io } from '../'

class TableController {
  static async get(req, res) {
    const response = await tableService.get()

    res.json(response)
  }

  static async update(req, res) {
    const table = await tableService.get()

    if (!table) {
      res.json({ message: 'Table not found' })
    }

    const { _id: id } = table

    const response = await tableService.update(id, req.body)

    res.json(response)
  }
}

export default TableController
