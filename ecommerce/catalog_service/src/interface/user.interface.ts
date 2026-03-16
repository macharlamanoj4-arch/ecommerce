import { User }  from "../models/user.model";

export interface IUserRepository {
  create(data: User): Promise<User>;
  update(data: User): Promise<User>;
  delete(id: any);
  findOne(username: String , password: String ): Promise<User>;
}
