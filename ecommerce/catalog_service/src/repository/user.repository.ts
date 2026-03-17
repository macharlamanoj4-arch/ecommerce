import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interface/user.interface";
import { User } from "../models/user.model";
import { NotFoundError } from "../utils";

export class UserRepository implements IUserRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: User): Promise<User> {
    return this._prisma.User.create({
      data,
    });
  }
  async update(data: User): Promise<User> {
    return this._prisma.User.update({
      where: { id: data.id },
      data,
    });
  }
  async delete(id: any) {
    return this._prisma.User.delete({
      where: { id },
    });
  }
  async findOne(username: String , password: String ): Promise<User> {
    const User = await this._prisma.User.findFirst({
      where: { 
        "username": username ,
        "password": password
     },
    });
    if (User) {
      return Promise.resolve(User);
    }
    throw new NotFoundError("User not found");
  }
}
