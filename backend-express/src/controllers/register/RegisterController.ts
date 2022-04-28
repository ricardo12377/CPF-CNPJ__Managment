import {Response, Request} from 'express'
import { RegisterServices } from '../../services/register/RegisterServices'

export class RegisterControllers {
    async CreateController (request: Request, response: Response) {

        const { code, isBlocked, type } = request.body;

        const service = new RegisterServices();

        const result = await service.Create({code, isBlocked, type});

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result)
    }

    async DeleteController (request: Request, response: Response) {
        const { id } = request.params;

        const service = new RegisterServices();

        const result = await service.Delete(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.status(200).end();
    }

    async GetAllController (request: Request, response: Response) {
        
        const service = new RegisterServices();

        const registers = await service.GetAll();

        return response.json(registers);
    }

    async GetOneController (request: Request, response: Response) {
        
        const { id } = request.params;

        const service = new RegisterServices();

        const register = await service.getOne(id);

        return response.json(register);
    }

    async UpdateController(request: Request, response: Response) {
        const {id} = request.params
        const { code, isBlocked, type } = request.body

        const service  = new RegisterServices();

        const result = await service.Update({id, code, isBlocked, type});

        if(result instanceof Error) {
            response.status(400).json(result.message)
        }

        return response.json(result)
    }
}