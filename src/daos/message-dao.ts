import Message from "../models/message-model";
import { IMessage } from "../models/types";
import BaseDao from "./base-dao";

let instance:MessageDao;
class MessageDao extends BaseDao {

    static getInstance():MessageDao {
        if(!instance) {
            instance = new MessageDao();
        }
        return instance;
    }
    async getAll() {
        try {
            const messages = await Message.find().select('-__v');
            return messages;
            
        } catch (err) {
            throw err;
        }
    }
    async getById(id:string) {
        try {
            const message = await Message.findById(id).select('-__v');
            return message;
        } catch (err) {
            throw err;
        }
    }
    async create(message:IMessage) {
        try {
            return await Message.create(message);
        } catch (err) {
            throw err;
        }
    }
}

export default MessageDao;