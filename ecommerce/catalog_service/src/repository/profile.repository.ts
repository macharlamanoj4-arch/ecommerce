import { PrismaClient } from "@prisma/client";
import { IProfileRepository } from "../interface/profile.interface";
import { Profile } from "../models/profile.model";
import { NotFoundError } from "../utils";

export class ProfileRepository implements IProfileRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Profile): Promise<Profile> {
    return this._prisma.Profile.create({
      data,
    });
  }
  async update(data: Profile): Promise<Profile> {
    return this._prisma.Profile.update({
      where: { id: data.id },
      data,
    });
  }
  async delete(id: any) {
    return this._prisma.Profile.delete({
      where: { id },
    });
  }
  async findOne(id: String): Promise<Profile> {
    const Profile = await this._prisma.Profile.findFirst({
      where: { id },
    });
    if (Profile) {
      return Promise.resolve(Profile);
    }
    throw new NotFoundError("Profile not found");
  }
}
