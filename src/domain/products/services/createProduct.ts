import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeORM/entities/Product";
import { ProductRepository } from "../typeORM/repository/productRepository";


interface CreateProductService {
    name: string;
    price: number;
    quantity: number;
}

export class CreateProduct {

    private productRepository: ProductRepository

    constructor() {
        this.productRepository = getCustomRepository(ProductRepository);
    }


    async execute({ name, price, quantity }: CreateProductService): Promise<Product> {

        const productExists = await this.productRepository.findByName(name);

        if (productExists) {
            const error = new AppError('Product already exists', 400);

            throw error;
        }

        const product = this.productRepository.create({
            name,
            price,
            quantity
        })

        await this.productRepository.save(product);

        return product;
    }

}