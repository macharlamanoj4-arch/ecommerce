import { ITokenRepository } from "../interface/token.interface";
import { generateToken } from "../utils/token";

export class TokenService {
  private _repository: ITokenRepository;

  constructor(repository: ITokenRepository) {
    this._repository = repository;
  }

  async createToken(input: any) {
    const token = generateToken(input.userId, input.expires, input.type);
    delete input.expires
    input.token = token;
    const data = await this._repository.create(input);
    if (!data.userId) {
      throw new Error("unable to create category");
    }
    return data;
  }

  async updateToken(input: any) {
    const data = await this._repository.update(input);
    if (!data.userId) {
      throw new Error("unable to update category");
    }
    // emit event to update record in Elastic search
    return data;
  }

  // instead of this we will get category from Elastic search
  async getTokens(userId: string) {
    const categorys = await this._repository.find(userId);

    return categorys;
  }

  async getToken(userId:string, type:string) {
    const category = await this._repository.findOne(userId, type);
    return category;
  }

  async deleteToken(id: string) {
    const response = await this._repository.delete(id);
    // delete record from Elastic search
    return response;
  }

}
