export interface IProduct {
    name: string;
    price: number;
    genres_id: Schema.Types.ObjectId[];
    author_id: Schema.Types.ObjectId;
    year: number;
    type: 'manga' | 'manhwa';
    imgExt:string
}

export interface IMessage {
    name: string;
    email: string;
    content: string;
    timestamp: Date;
}

export interface IGeneric {
    value: string;
}

export interface IProductDto {
    _id: string;
    name: string;
    price: number;
    genres_id: Schema.Types.ObjectId[];
    author_id: Schema.Types.ObjectId;
    year: number;
    type: 'manga' | 'manhwa';
    imgExt:string
}