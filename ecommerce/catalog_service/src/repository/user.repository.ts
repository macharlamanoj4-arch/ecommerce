import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interface/user.interface";
import { User, Profile } from "../models/user.model";
import { NotFoundError } from "../utils";

export class UserRepository implements IUserRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: User): Promise<User>  {
  const result = await this._prisma.user.create({
    data: {
      username: data.username,
      password: data.password,

      // Handle profile relation
      ...(data.profile && {
        profile: {
          create: {
            firstName: data.profile.firstName,
            lastName: data.profile.lastName,
            email: data.profile.email,
            address: data.profile.address,
            phone: data.profile.phone,
          },
        },
      }),
    },
    include: {
      profile: true,
    },
  });

  return this.mapToUser(result);
}
  async update(data: User): Promise<User> {
  const result = await this._prisma.user.update({
    where: { id: data.id },
    data: {
      username: data.username,
      password: data.password,
    },
    include: {
      profile: true,
    },
  });

  return this.mapToUser(result);
}
  async delete(id: any) {
    return this._prisma.user.delete({
      where: { id },
    });
  }
  async findOne(username: string , password: string ): Promise<User> {
  const user = await this._prisma.user.findFirst({
    where: {
      username,
      password,
    },
    include: {
      profile: false,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return this.mapToUser(user);
}
  private mapToUser(data: any): User {
  return new User(
    data.id,
    data.username,
    data.password,
    data.profile
      ? new Profile(
          data.profile.id,
          data.profile.firstName,
          data.profile.lastName,
          data.profile.email,
          data.profile.address,
          data.profile.phone
        )
      : undefined
  );
}
}
