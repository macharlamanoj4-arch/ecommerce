import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";

export class ProfileRequest {
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
}
export class CreateProfileRequest {

  @ValidateNested()
  @Type(() => ProfileRequest)
  profile: ProfileRequest;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export class UpdateProductRequest {
  name?: string;

  description?: string;

  price?: number;

  @IsNumber()
  stock?: number;
}
