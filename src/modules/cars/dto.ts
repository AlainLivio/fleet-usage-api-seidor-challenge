import { IsString } from "class-validator";

export class CreateCarDto {
  @IsString()
  plate!: string;

  @IsString()
  color!: string;

  @IsString()
  brand!: string;
}

export class UpdateCarDto {
  @IsString()
  plate?: string;

  @IsString()
  color?: string;

  @IsString()
  brand?: string;
}
