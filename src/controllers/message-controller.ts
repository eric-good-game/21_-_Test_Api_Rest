import { Request, Response } from "express";
import messageServices from "../services/message-services";

class MessageController {

    private messageServices = messageServices;

    constructor(){
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
    }

    async getAll(req:Request,res:Response){
        try {
            const messages = await this.messageServices.getAll();
            res.status(200).json(messages);
        } catch (err) {
            console.log(err);
            if(err instanceof Error){
                res.status(500).json({message:err.message})
            }
        }
    }
    async getById(req:Request,res:Response){
        try {
            const message = await this.messageServices.getById(req.params.id);
            res.status(200).json(message);
        } catch (err) {
            console.log(err);
            if(err instanceof Error){
                res.status(500).json({message:err.message})
            }
        }
    }
    async create(req:Request,res:Response){
        try {
            const message = await this.messageServices.create(req.body);
            res.status(201).json(message);
        } catch (err) {
            console.log(err);
            if(err instanceof Error){
                res.status(500).json({message:err.message})
            }
        }
    }
}
const messageController = new MessageController();
export default messageController;