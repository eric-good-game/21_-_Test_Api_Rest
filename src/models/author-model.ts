import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema({
    value: {type: String, required: true}
})

const Author = mongoose.model("Author", authorSchema);

export default Author;