import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { NotFoundError } from "../utils";

export class CatalogRepository implements ICatalogRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    return this._prisma.product.create({
      data,
    });
  }
  async update(data: Product): Promise<Product> {
    return this._prisma.product.update({
      where: { id: data.id },
      data,
    });
  }
  async delete(id: any) {
    return this._prisma.product.delete({
      where: { id },
    });
  }
  async find(limit: number, cursorId: string): Promise<Product[]> {
    return this._prisma.product.findMany({
      take: limit,
      ...(cursorId && {
        skip: 1,
        cursor: {
          id: cursorId,
        },
      }),
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async findOne(id: string): Promise<Product> {
    const product = await this._prisma.product.findFirst({
      where: { id },
    });
    if (product) {
      return Promise.resolve(product);
    }
    throw new NotFoundError("product not found");
  }

  findStock(ids: string[]): Promise<Product[]> {
    return this._prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findByCategory(categoryId: string): Promise<Product[]> {
    return this._prisma.product.findMany({
      where: {
        categoryId,
      },
    });
  }
}
