import { Router } from 'express'
import  userControllers  from './users.controllers'

export const usersRoutes = Router()

usersRoutes.post('/',userControllers.createSchema,userControllers.create)
