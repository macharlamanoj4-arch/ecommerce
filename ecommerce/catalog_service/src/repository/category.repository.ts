import { PrismaClient } from "@prisma/client";
import { Category, Product } from "../models/product.model";
import { NotFoundError } from "../utils";
import { ICategoryRepository } from "../interface/categoryRepository.interface";

export class CatalogRepository implements ICategoryRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Category): Promise<Category> {
    return this._prisma.category.create({
      data,
    });
  }
  async update(data: Category): Promise<Category> {
    return this._prisma.category.update({
      where: { id: data.id },
      data,
    });
  }
  async delete(id: any) {
    return this._prisma.category.delete({
      where: { id },
    });
  }
  async find(): Promise<Category[]> {
    return this._prisma.category.findMany({
    });
  }
  async findOne(id: number): Promise<Category> {
    const category = await this._prisma.category.findFirst({
      where: { id },
    });
    if (category) {
      return Promise.resolve(category);
    }
    throw new NotFoundError("category not found");
  }


  findByCategory(categoryId: number): Promise<Product[]> {
    return this._prisma.category.findMany({
      where: {
        id: categoryId,
      },
      include: {
        products: true,
      },
    });
  }
}
