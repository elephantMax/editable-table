import { Router } from 'express'
import AsyncHandler from 'express-async-handler'
import TableController from '../controller/TableController'

const TableRouter = Router()

TableRouter.get('/', [], AsyncHandler(TableController.get))
TableRouter.post('/', [], AsyncHandler(TableController.create))
TableRouter.put('/', [], AsyncHandler(TableController.update))

export default TableRouter
