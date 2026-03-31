import { Category } from "../models/product.model";

export interface ICategoryRepository {
  create(data: Category): Promise<Category>;
  update(data: Category): Promise<Category>;
  delete(id: number);
  find(): Promise<Category[]>;
  findOne(id: number): Promise<Category>;
  findByCategory(id: number): Promise<Category[]>;
}
