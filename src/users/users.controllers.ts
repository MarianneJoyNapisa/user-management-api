import { Request, Response, NextFunction } from "express"
import { userService } from "./users.service"
import  validateRequest  from "../_middleware/validate-request"
import Joi from "joi"
import bcrypt from "bcryptjs"
import { UserType } from "./users.interface"


const getAll = (req : Request, res : Response, next : NextFunction) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next)
}

const getById = (req : Request, res : Response, next : NextFunction) => {
    userService.getById(req.params.id as unknown as number)
        .then(users => res.json(users))
        .catch(next)
}

const create = (req : Request, res : Response, next : NextFunction) => {
    userService.create(req.body)
        .then(() => res.json({message : "User created"}))
        .catch(next)
}

const createSchema = (req : Request, res : Response, next : NextFunction) => {
    const schema = Joi.object({
        title : Joi.string().required(),
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        role : Joi.string().valid('Admin', 'User').required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required(),
        confirmPassword : Joi.string().valid(Joi.ref('password')).required()
    })
    validateRequest(req, next, schema)
}

const userControllers = {
    getAll,
    getById,
    create,
    createSchema,
}

export default userControllers