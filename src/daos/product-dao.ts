import Product from "../models/product-model";
import BaseDao from "./base-dao";
import Author from "../models/author-model";
import Genre from "../models/genre-model";
import { IProduct } from "../models/types";

let instance:ProductDao;
class ProductDao extends BaseDao {
    a = 10;
    static getInstance():ProductDao {
        if(!instance) {
            instance = new ProductDao();
        }
        return instance;
    }
    
    async getAll() {
        try {
            return await Product.find().select('-__v')
                .populate({ 
                    path: "author_id", 
                    model: Author,
                    select: "value"
                })
                .populate({ 
                    path: "genres_id", 
                    model: Genre,
                    select: "value"
                })
        } catch (err) {
            throw err;
        }
    }
    async getById(id:string) {
        try {
            return await Product.findById(id).select('-__v')
                .populate({
                    path: "author_id",
                    model: Author,
                    select: "value"
                })
                .populate({
                    path: "genres_id",
                    model: Genre,
                    select: "value"
                })
        } catch (err) {
            throw err;
        }
    }
    async create(product:IProduct) {
        try {

            const autorExist = await Author.exists({_id:product.author_id});
            // const genresExist = await Genre.find({_id:{$in:product.genres_id}},{_id: 1});
            const genresExist = await Genre.countDocuments({_id:{$in:product.genres_id}});

            if(autorExist && genresExist === product.genres_id.length) {
                return await Product.create(product);
            }else{
                throw new Error("Author or Genre not found");
            }
        } catch (err) {
            throw err;
        }
    }
    async update(id:string,product:IProduct) {
        try {
            const autorExist = await Author.exists({_id:product.author_id});
            // const genresExist = await Genre.find({_id:{$in:product.genres_id}},{_id: 1});
            const genresExist = await Genre.countDocuments({_id:{$in:product.genres_id}});

            if(autorExist && genresExist === product.genres_id.length) {
                return await Product.findByIdAndUpdate(id,product,{new:true});
            }else{
                throw new Error("Author or Genre not found");
            }
        } catch (err) {
            console.log(err);
            
        }
    }
    async delete(id:string) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (err) {
            console.log(err);
            
        }
    }
}

export default ProductDao;