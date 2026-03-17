import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProfileRequest {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateProductRequest {
  name?: string;

  description?: string;

  price?: number;

  @IsNumber()
  stock?: number;
}
