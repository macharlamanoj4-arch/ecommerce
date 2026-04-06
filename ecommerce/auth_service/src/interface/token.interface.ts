import { Token }  from "../models/user.model";

export interface ITokenRepository {
  create(data: Token): Promise<Token>;
  update(data: Token): Promise<Token>;
  delete(id: string);
  find(userId: string): Promise<Token[]>;
  findOne(userId: string , type: string): Promise<Token>;
}
