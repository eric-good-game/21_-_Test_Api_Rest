import { Router } from "express";
import productController from "../../controllers/product-controller";
const  router = Router();

router
    .get("/", productController.getAll)
    .get("/:id", productController.getById)
    .post("/", productController.create)
    .put("/:id", productController.update)
    .delete("/:id", productController.delete)

export default router;