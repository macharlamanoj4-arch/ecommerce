import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  img?: string;
}

export class UpdateProductRequest {
  
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  img?: string;
}
