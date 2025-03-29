import { Router } from 'express'
import  userControllers  from './users.controllers'

export const usersRoutes = Router()

usersRoutes.get('/',userControllers.getAll)
usersRoutes.get('/:id',userControllers.getById)
usersRoutes.post('/',userControllers.createSchema,userControllers.create)
usersRoutes.put('/:id',userControllers.updateSchema,userControllers.update)
usersRoutes.delete('/:id',userControllers.delete)