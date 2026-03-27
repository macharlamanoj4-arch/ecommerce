export class Product {
  constructor(
    public readonly name: string,
    public readonly description: string | null,
    public readonly price: number,
    public readonly stock: number,
    public readonly id?: string,
    public readonly img?: string | null
  ) {}
}
