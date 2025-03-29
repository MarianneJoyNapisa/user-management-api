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

const update = async(id : number, params : UserUpdate) => {

    const user = await userRepository.findOne({where : { id }});                  
    if (!user) throw 'User not found';


    if(params.email && params.email !== user.email) {
        if (await userRepository.findOne({where : {email : params.email}})) {
            throw 'Email "' + params.email + '" is already taken';
        }
    }

    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password,10);
    }
    await userRepository.update(id, {title : params.title, firstName : params.firstName, lastName : params.lastName, email : params.email, passwordHash : params.passwordHash, role : params.role});
}

const _delete = async (id : number) => {
    await userRepository.delete(id);
}

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete : _delete
}

