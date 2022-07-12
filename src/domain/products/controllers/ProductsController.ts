import { Request, Response } from "express";
import { CreateProduct } from "../services/createProduct";
import { GetProduct } from "../services/getProduct";
import { ListProducts } from "../services/listProducts";
import { RemoveProduct } from "../services/removeProduct";
import { UpdateProduct } from "../services/updateProduct";

export class ProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    const productList = new ListProducts();

    const products = await productList.execute();

    return response.json(products);
  }

  async findProduct(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        message: "Id is required",
      });
    }

    const findProduct = new GetProduct();

    const product = await findProduct.execute(id);

    if (!product) {
      return response.status(400).json({
        message: "Product not found",
      });
    }

    return response.json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProduct();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    if (!product) {
      return response.status(400).json({
        message: "Product not created",
      });
    }

    return response.json(product);
  }

  async update(request: Request, response:Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        message: "Id is required",
      });
    }

    const { name, price, quantity } = request.body;

    if (!name || !price || !quantity) {
      return response.status(400).json({
        message: "Name, price and quantity are required",
      });
    }

    const updateProduct = new UpdateProduct();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    if (!product) {
      return response.status(400).json({
        message: "Product not updated",
      });
    }

    return response.json(product);
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        message: "Id is required",
      });
    }

    const removeProduct = new RemoveProduct();

    await removeProduct.execute(id);

    return response.json({
      message: "Product removed",
    });
  }
}
