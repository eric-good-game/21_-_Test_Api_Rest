import mongoose, {Schema} from "mongoose";
import { IProduct } from "./types";


const productSchema = new Schema<IProduct>({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    genres_id: [{type: Schema.Types.ObjectId,ref:'Genre', required: true}],
    author_id: {type: Schema.Types.ObjectId, ref:'Author', required: true},
    year: {type: Number, required: true},
    type: {type: String, required: true},
    imgExt: {type: String, required: true}
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;