import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeORM/entities/Product";
import { ProductRepository } from "../typeORM/repository/productRepository";


export class GetProduct {
    
        private productRepository: ProductRepository
    
        constructor() {
            this.productRepository = getCustomRepository(ProductRepository);
        }
    
        async execute(id: string): Promise<Product | undefined> {
            const product = await this.productRepository.findOne(id);
    
            if(!product) {
                const error = new AppError('Product not found', 404);
                throw error;
            }


            return product;
        }
    
}