import { Router } from "express";
import messageController from "../../controllers/message-controller";
const  router = Router();

router
    .get("/", messageController.getAll)
    .get("/:id", messageController.getById)
    .post("/", messageController.create)

export default router;