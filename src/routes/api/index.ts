import { Router } from "express";
import DaoFactory from "../../daos";
import productRouter from "./product-route";
import messageRouter from "./message-route";

const  router = Router();

router
    .use('/products',productRouter)
    .use('/messages',messageRouter)
    .get('/testSingleton',(req,res)=>{
        const instance1 = DaoFactory.getInstance().createDao('products');
        const instance2 = DaoFactory.getInstance().createDao('products');
        instance1.a = 20;
        const same = instance1.a === instance2.a;
        res.json({intance1:instance1.a,intance2:instance2.a, same});
    })

export default router;