import { Profile } from "../models/profile.model";

export interface IProfileRepository {
  create(data: Profile): Promise<Profile>;
  update(data: Profile): Promise<Profile>;
  delete(id: String);
  findOne(id: String): Promise<Profile>;
}
