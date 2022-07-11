import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeORM/repository/productRepository";


export class RemoveProduct {
    
        private productRepository: ProductRepository
    
        constructor() {
            this.productRepository = getCustomRepository(ProductRepository);
        }
    
        async execute(id: string): Promise<void> {
    
            const product = await this.productRepository.findOne(id);
    
            if (!product) {
                const error = new AppError('Product not found', 404);
    
                throw error;
            }
    
            await this.productRepository.remove(product);
        }
    
}