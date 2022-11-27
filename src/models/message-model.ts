import { model, Schema } from "mongoose";
import { IMessage } from "./types";

const messageSchema = new Schema<IMessage>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: {type: Date, required: true, default: Date.now}
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;