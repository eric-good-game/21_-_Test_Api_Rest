import { Request, Response } from "express";
import DaoFactory from "../daos";
// import ProductDto from "../dto/message-dto";
import { IMessage} from "../models/types";

class MessageServices {

    private messageDao = DaoFactory.getInstance().createDao('messages');

    async getAll(){
        try {
            const messages = await this.messageDao.getAll();
            return messages;
        } catch (err) {
            throw err;
        }
    }
    async getById(id:string) {
        try {
            const message = await this.messageDao.getById(id);
            return message;
        } catch (err) {
            throw err;
        }
    }
    async create(message:IMessage) {
        try {
            return await this.messageDao.create(message);
        } catch (err) {
            throw err;
        }
    }
}
const messageServices = new MessageServices();
export default messageServices;