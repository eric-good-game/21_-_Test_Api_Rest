import { Router } from "express";
import indexRouter from './api'
const  router = Router();

router.use('/api/v1',indexRouter)

export default router;