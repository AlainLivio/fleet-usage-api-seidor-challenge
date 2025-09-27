import { IsString } from "class-validator";

export class CreateDriverDto {
  @IsString()
  name!: string;
}

export class UpdateDriverDto {
  @IsString()
  name?: string;
}
