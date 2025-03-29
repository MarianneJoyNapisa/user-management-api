import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { UserType,UserUpdate } from "./users.interface";


const userRepository = AppDataSource.getRepository(User);

const getAll = async () => {
    return await userRepository.find();
}

const getById = async (id: number) => {
    return await userRepository.findOne({where : {id}});
}

const create = async (params : UserType) => {
    if ( await userRepository.findOne({where : {email : params.email}})){
        throw 'Email "' + params.email + '" is already taken';
    }

    const hashedPassword = await bcrypt.hash(params.password,10)
    const newUser = userRepository.create({lastName : params.lastName, firstName : params.firstName, email : params.email, passwordHash : hashedPassword, role : params.role, title : params.title});
    await userRepository.save(newUser);
}


const _delete = async (id : number) => {
    await userRepository.delete(id);
}

export const userService = {
    getAll,
    getById,
    create,
    delete : _delete
}

