import axios from 'axios';
import mangas from '../../mangas.json';

class CustomTest {
    url: string;
    totalItems: number;
    itemID: string;
    item: any;

    
    constructor(url: string) {
        this.url = url;
        this.totalItems = 0;
        this.itemID = '';
    }

    async beforeAll(){
        try {
            this.totalItems = await (await axios.get(this.url)).data.length;
        } catch (err) {
            console.log(err);
            
        }
    }

    async getAll(){
        const r = ['Se espera obtener un status 200 y todos los registros de la base de datos'];
        try {
            console.log('1) GET ALL');
            const response = await axios.get(this.url);
            
            if(response.status === 200){
                r.push('  \x1b[32m\u2714 status 200');
            }else{
                r.push(`  \x1b[31m\u2716 status ${response.status}`);
            }
            if(response.data.length === this.totalItems){
                r.push(`  \x1b[32m\u2714 Obtenido el número de items esperado.`);
                r.push(`  \x1b[37mTotal items ${response.data.length}`);
                this.totalItems = response.data.length;
            }else{
                r.push('  \x1b[31m\u2716 No existen items en la colección.');
            }
        } catch (err) {
            console.log(err);
            
        }
        r.forEach((item) => {
            console.log('  ',item);
        });
        console.log('');
    }
    async create(item: any){
        const r = ['Se espera obtener un status 201 y generar un nuevo registro en la base de datos'];
        try {
            console.log('2) POST');
            const response = await axios.post(this.url, item);

            if(response.status === 201){
                r.push('  \x1b[32m\u2714 status 201');
            }else{
                r.push(`  \x1b[31m\u2716 status ${response.status}`);
            }
            if(response.data._id && this.totalItems+1 === await (await axios.get(this.url)).data.length){
                r.push('  \x1b[32m\u2714 Item creado correctamente.');
                r.push(`  \x1b[37mID ${response.data._id}`);
                this.totalItems++;
                this.itemID = response.data._id;
            }else{
                r.push('  \x1b[31m\u2716 Item no creado.');
                // r.push(`  \x1b[37mItem id ${response.data._id}`);
            }
        } catch (err) {
            console.log(err);
        }
        r.forEach((item) => {
            console.log('  ',item);
        });
        console.log('');
        
    }
    async getById(){
        const r = ['Se espera obtener un status 200 y un registro de la base de datos'];
        try {
            console.log('3) GET BY ID');
            const response = await axios.get(this.url+'/'+this.itemID);            

            if(response.status === 200){
                r.push('  \x1b[32m\u2714 status 200');
            }else{
                r.push(`  \x1b[31m\u2716 status ${response.status}`);
            }
            if(response.data._id){
                r.push('  \x1b[32m\u2714 Item obtenido correctamente.');
                r.push(`  \x1b[37mNombre ${response.data.name}`);
                this.item = response.data;
            }else{
                r.push('  \x1b[31m\u2716 Item no obtenido.');
                // r.push(`  \x1b[37mItem id ${response.data._id}`);
            }
        } catch (err) {
            console.log(err);
        }
        r.forEach((item) => {
            console.log('  ',item);
        });
        console.log('');
        
    }
    async put(){
        const r = ['Se espera obtener un status 200 y actualizar un registro de la base de datos'];
        try {
            console.log('4) PUT');
            const item = this.item;
            const response = await axios.put(this.url+'/'+this.itemID, {...item,name:'coderhouse'});
            if(response.status === 200){
                r.push('  \x1b[32m\u2714 status 200');
            }else{
                r.push(`  \x1b[31m\u2716 status ${response.status}`);
            }
            
            if(response.data.name !== this.item.name){
                r.push('  \x1b[32m\u2714 Item actualizado correctamente.');
                r.push(`  \x1b[37mNombre ${response.data.name}`);
            }else{
                r.push('  \x1b[31m\u2716 Item no actualizado.');
                // r.push(`  \x1b[37mItem id ${response.data._id}`);
            }
        } catch (err) {
            console.log(err);
        }
        r.forEach((item) => {
            console.log('  ',item);
        });
        console.log('');
    }
    async delete(){
        const r = ['Se espera obtener un status 200 y eliminar un registro de la base de datos'];
        try {
            console.log('5) DELETE');
            const response = await axios.delete(this.url+'/'+this.itemID);
            if(response.status === 200){
                r.push('  \x1b[32m\u2714 status 200');
            }else{
                r.push(`  \x1b[31m\u2716 status ${response.status}`);
            }
            if(this.totalItems-1 === await (await axios.get(this.url)).data.length){
                r.push('  \x1b[32m\u2714 Item eliminado correctamente.');
                r.push(`  \x1b[37mID ${this.itemID}`);
                this.totalItems--;
            }else{
                r.push('  \x1b[31m\u2716 Item no eliminado.');
                // r.push(`  \x1b[37mItem id ${response.data._id}`);
            }
        } catch (err) {
            console.log(err);
        }
        r.forEach((item) => {
            console.log('  ',item);
        });
        console.log('');
    }
    async start(){
        await this.beforeAll();
        await this.getAll();
        await this.create(mangas[0]);
        await this.getById();
        await this.put();
        await this.delete();
    }
}

const test = new CustomTest('http://localhost:8080/api/v1/products');
test.start();