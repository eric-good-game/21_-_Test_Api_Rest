import { IGeneric, IProductDto } from "../models/types";

class ProductDto{
    id: string;
    name: string;
    price: number;
    // description: string;
    image: string;
    genres: string[];
    author: string;
    type: string;

    constructor(id:string,product:IProductDto){
        this.id = id;
        this.name = product.name;
        this.price = product.price;
        this.image = id + product.imgExt;
        this.genres = this.getGenresValues(product.genres_id);
        this.author = this.getAuthorValue(product.author_id);
        this.type = product.type;
    }
    private getGenresValues(genres:IGeneric[]){
        return genres.map(genre => genre.value);
    }
    private getAuthorValue(author:IGeneric){
        return author.value;
    }

}

export default ProductDto;