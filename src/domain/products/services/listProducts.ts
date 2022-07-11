import { getCustomRepository } from "typeorm";
import { Product } from "../typeORM/entities/Product";
import { ProductRepository } from "../typeORM/repository/productRepository";


export class ListProducts{

    private productRepository: ProductRepository

    constructor() {
        this.productRepository = getCustomRepository(ProductRepository);
    }

    async execute(): Promise<Product[]> {
        const products = await this.productRepository.find();

        return products;
    }

}