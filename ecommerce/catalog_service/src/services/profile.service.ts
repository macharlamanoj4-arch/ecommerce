import { IProfileRepository } from "../interface/profile.interface";

export class ProfileService {
  private _repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this._repository = repository;
  }

  async createProfile(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create Profile");
    }
    return data;
  }

  async updateProfile(input: any) {
    const data = await this._repository.update(input);
    if (!data.id) {
      throw new Error("unable to update Profile");
    }
    // emit event to update record in Elastic search
    return data;
  }

  async getProfile(id: String) {
    const Profile = await this._repository.findOne(id);
    return Profile;
  }

  async deleteProfile(id: String) {
    const response = await this._repository.delete(id);
    // delete record from Elastic search
    return response;
  }
}
