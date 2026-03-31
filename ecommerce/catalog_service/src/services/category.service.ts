import { ICategoryRepository } from "../interface/categoryRepository.interface";

export class CategoryService {
  private _repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this._repository = repository;
  }

  async createCategory(input: any) {
    const data = await this._repository.create(input);
    if (!data.name) {
      throw new Error("unable to create category");
    }
    return data;
  }

  async updateCategory(input: any) {
    const data = await this._repository.update(input);
    if (!data.name) {
      throw new Error("unable to update category");
    }
    // emit event to update record in Elastic search
    return data;
  }

  // instead of this we will get category from Elastic search
  async getCategorys() {
    const categorys = await this._repository.find();

    return categorys;
  }

  async getCategory(id: number) {
    const category = await this._repository.findOne(id);
    return category;
  }

  async deleteCategory(id: number) {
    const response = await this._repository.delete(id);
    // delete record from Elastic search
    return response;
  }

  async getByCategory(id: number) {
    const category = await this._repository.findByCategory(id);
    return category;
  }

}
