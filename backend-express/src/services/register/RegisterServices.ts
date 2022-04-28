import { getRepository } from "typeorm";
import { Register } from "../../entities/Register";

type ServiceTypes = {
    code: string;
    isBlocked: boolean;
    type: string;
}

type UpdateServiceTypes = {
    id: string;
    code: string;
    isBlocked: boolean;
    type: string;
}

export class RegisterServices {
    
    async Create ({ code, isBlocked, type}:ServiceTypes) {
        const repo = getRepository(Register)

        if(await repo.findOne({code})) {
            return new Error("Code already exists!")
        }

        const register = repo.create({
            code,
            isBlocked,
            type
        })

        await repo.save(register)

        return register;
    }

    async Delete(id: string) {
        const repo = getRepository(Register)

        if(!await repo.findOne(id)) {
            return new Error("Register does not exists")
        }

        await repo.delete(id)
    }

    async GetAll() {
        const repo = getRepository(Register)


        const registers = await repo.find();

        return registers
    }

    async getOne(id: string): Promise<Register | Error> {
   
        const repo = getRepository(Register)

        const register = await repo.findOne(id)

        if(!register) {
            return new Error("Register does not exists")
        }

        return register
     }

    async Update({ code, isBlocked, type, id}:UpdateServiceTypes): Promise<Register | Error> {
        const repo = getRepository(Register);

        const register = await repo.findOne(id);

        if(!register) {
            return new Error("Register not exists!")
        }

        register.code = code ? code : register.code;
        register.isBlocked = isBlocked ? isBlocked : register.isBlocked;
        register.type = type ? type : register.type;

        await repo.save(register)

        return register;
    }
}