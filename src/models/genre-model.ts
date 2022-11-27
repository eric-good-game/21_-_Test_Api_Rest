import { model, Schema } from "mongoose";

const genreSchema = new Schema({
    value: {type: String, required: true}
})

const Genre = model("Genre", genreSchema);

export default Genre;