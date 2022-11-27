

import mongoose from "mongoose";
import supertest from "supertest";
import { expect } from "chai";
import app from "../app";
import mangas from '../../mangas.json';
import { IProduct } from "../models/types";

let server:any;
let request:any;
let totalDocs = 0;
let docId = '';
let doc:IProduct;

describe('Test for API products',()=>{
    before(async()=>{
        await connectToDatabase();
        server = await startServer();
        request = supertest(
        `http://localhost:${server.address().port}/api/v1/products`
        );
        totalDocs = (await request.get('/')).body.length;
        
    });
    describe("GET ALL", () => {
        it("debería retornar un status 200 y todos los documentos", async () => {
            const response = await request.get("/");
            expect(response.status).to.eql(200);
            expect(response.body.length).to.eql(totalDocs)
        });
    });
    describe('POST',()=>{
        it('debería retornar un status 201 y el documento añadido', async()=>{
            const response = await request.post('/').send(mangas[0]);
            expect(response.status).to.eql(201);
            expect(response.body).contain.keys('_id');
            docId = response.body._id;
        });
    });
    describe("GET BY ID", () => {
        it("debería retornar un status 200 y un documento", async () => {
            
            const response = await request.get("/"+docId);
            expect(response.status).to.eql(200);
            doc = response.body;
        });
    });
    describe('PUT',()=>{
        it('debería retornar un status 200 y el documento actualizado', async()=>{
            const response = await request.put('/'+docId).send({...doc,name:'test'});
            expect(response.status).to.eql(200);
            expect(response.body.name).to.not.eql(doc.name);
            expect(response.body.name).to.eql('test');
        });
    });
    describe('DELETE',()=>{
        it('debería retornar un status 200 y los datos del documento eliminado', async()=>{
            const response = await request.delete('/'+docId);
            expect(response.status).to.eql(200);
            expect(response.body).contain.keys('_id');
        });
    });
    after(function () {
        mongoose.disconnect();
        server.close();
    });
})

async function startServer() {
  return new Promise((resolve, reject) => {
    const PORT = 0;
    const server = app.listen(PORT, () => {
    //   console.log(
    //     `Servidor express escuchando en el puerto ${PORT}`
    //   );
      resolve(server);
    });
    server.on("error", (error) => {
      console.log(`Error en Servidor: ${error}`);
      reject(error);
    });
  });
}
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://coderhouse:%405PmAPWakmq%40GHx@coderhouse.q5mhnd3.mongodb.net/coderhouse-project?retryWrites=true&w=majority');
        // logger.info('Connected to database');
        // console.log('Connected to database');
        
    } catch (error) {
        // logger.error('Error connecting to database', error);
        console.log('Error connecting to database', error);
        
    }
}

// let request;
// let server;

// describe("test api rest full", () => {
//   before(async function () {
//     await connectDb();
//     server = await startServer();
//     request = supertest(
//       `http://localhost:${server.address().port}/api/usuarios`
//     );
//   });

//   after(function () {
//     mongoose.disconnect();
//     server.close();
//   });

//   describe("GET", () => {
//     it("debería retornar un status 200", async () => {
//       const response = await request.get("/");
//       expect(response.status).to.eql(200);
//     });
//   });

//   describe("POST", () => {
//     it("debería incorporar un usuario", async () => {
//       const usuario = generar();

//       const response = await request.post("/").send(usuario);
//       expect(response.status).to.eql(200);

//       const user = response.body;
//       expect(user).to.include.keys("nombre", "email");
//       expect(user.nombre).to.eql(usuario.nombre);
//       expect(user.email).to.eql(usuario.email);
//     });
//   });
// });

// async function connectDb() {
//   try {
//     await mongoose.connect("mongodb://localhost/mibase", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("Base de datos conectada!");
//   } catch (error) {
//     throw new Error(`Error de conexión en la base de datos: ${err}`);
//   }
// }

// async function startServer() {
//   return new Promise((resolve, reject) => {
//     const PORT = 0;
//     const server = app.listen(PORT, () => {
//       console.log(
//         `Servidor express escuchando en el puerto ${server.address().port}`
//       );
//       resolve(server);
//     });
//     server.on("error", (error) => {
//       console.log(`Error en Servidor: ${error}`);
//       reject(error);
//     });
//   });
// }