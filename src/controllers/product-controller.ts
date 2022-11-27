import { Request, Response } from "express";
import productServices from "../services/product-services";

class ProductController {

    private productServices = productServices;

    constructor(){
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req:Request,res:Response){
        try {
            const products = await this.productServices.getAll();
            res.status(200).json(products);
        } catch (err) {
            console.log(err);
            if(err instanceof Error){
                res.status(500).json({message:err.message})
            }
        }
    }
    async getById(req:Request,res:Response){
        try {
            const product = await this.productServices.getById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            console.log(err);
            if(err instanceof Error){
                res.status(500).json({message:err.message})
            }
        }
    }
    async create(req:Request,res:Response){
        try {
            const product = await this.productServices.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            console.log(err);
            if(err instanceof Error){
                res.status(500).json({message:err.message})
            }
        }
    }
    async update(req:Request,res:Response){
        try {
            const product = await this.productServices.update(req.params.id,req.body);
            
            res.status(200).json(product);
        } catch (err) {
            console.log(err);
            if(err instanceof Error){
                res.status(500).json({message:err.message})
            }
        }
    }
    async delete(req:Request,res:Response){
        try {
            const product = await this.productServices.delete(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            console.log(err);
            if(err instanceof Error){
                res.status(500).json({message:err.message})
            }
        }
    }
}
const productController = new ProductController();
export default productController;