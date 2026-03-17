import { IUserRepository } from "../interface/user.interface";

export class UserService {
  private _repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  async createUser(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create User");
    }
    return data;
  }

  async updateUser(input: any) {
    const data = await this._repository.update(input);
    if (!data.id) {
      throw new Error("unable to update User");
    }
    // emit event to update record in Elastic search
    return data;
  }

  async getUser(username: String , password: String) {
    const User = await this._repository.findOne(username,password);
    return User;
  }

  async deleteUser(id: String) {
    const response = await this._repository.delete(id);
    // delete record from Elastic search
    return response;
  }
}
