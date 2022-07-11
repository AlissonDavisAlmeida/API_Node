import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product  from "../typeORM/entities/Product";
import { ProductRepository } from "../typeORM/repository/productRepository";

interface UpdateProductInterface {
    id: string;
    name: string;
    price: number;
    quantity: number;
}


export class UpdateProduct {

    private productRepository: ProductRepository

    constructor() {
        this.productRepository = getCustomRepository(ProductRepository);
    }

    async execute({ id, name, price, quantity }: UpdateProductInterface): Promise<Product | undefined> {

        const product = await this.productRepository.findOne(id);

        if (!product) {
            const error = new AppError('Product not found', 404);
            throw error;
        }

        const productExists = await this.productRepository.findByName(name);

        if (productExists && product.name !== name) {
            const error = new AppError('Product not found', 404);
            throw error;
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;


        await this.productRepository.save(product);

        return product

    }

}