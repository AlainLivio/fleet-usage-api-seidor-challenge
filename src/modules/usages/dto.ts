import { IsString } from "class-validator";

export class CreateUsageDto {
  @IsString()
  carId!: string;

  @IsString()
  driverId!: string;

  @IsString()
  startAt!: string;

  @IsString()
  reason!: string;
}

export class FinishUsageDto {
  @IsString()
  endAt!: string;
}
