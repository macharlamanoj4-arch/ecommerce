export class Category {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly image?: string | null,
    public readonly products?: Product[],
  ) {}
}

export class Product {
  constructor(
    public readonly name: string,
    public readonly description: string | null,
    public readonly price: number,
    public readonly stock: number,
    public readonly id?: string,
    public readonly image?: string | null,
    public readonly categoryId?: number | null,
    public readonly category?: Category,
  ) {}
}
