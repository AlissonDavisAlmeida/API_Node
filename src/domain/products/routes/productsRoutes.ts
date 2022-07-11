import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";


const productRouter = Router();
const productsController = new ProductsController();


productRouter.get("/", productsController.index)
productRouter.get("/:id", productsController.findProduct)
productRouter.post("/", productsController.create)
productRouter.put("/:id", productsController.update)
productRouter.delete("/:id", productsController.remove)

export {
    productRouter
}