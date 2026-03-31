import { Product } from "../models/product.model";

export interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: string);
  find(limit: number, id: string): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
  findStock(ids: string[]): Promise<Product[]>;
}
