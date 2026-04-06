import { PrismaClient, Token as PrismaToken } from "@prisma/client";
import { NotFoundError } from "../utils";
import { ITokenRepository } from "../interface/token.interface";
import { Token } from "../models/user.model";

export class TokenRepository implements ITokenRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: PrismaToken): Promise<Token> {
    return this._prisma.token.create({
      data,
    });
  }
  async update(data: PrismaToken): Promise<Token> {
    return this._prisma.token.update({
      where: { id: data.id },
      data,
    });
  }
  async delete(id: string) {
    return this._prisma.token.delete({
      where: { id },
    });
  }
  async find(userId:string): Promise<Token[]> {
    return this._prisma.token.findMany({
      where: { userId },
    });
  }
  async findOne(userId: string, type: string): Promise<Token> {
    const token = await this._prisma.token.findFirst({
      where: { userId,
        type,
        blacklisted: false,
       },
    });
    if (token) {
      return Promise.resolve(token);
    }
    return Promise.reject(new NotFoundError("token not found"));
  }
}
