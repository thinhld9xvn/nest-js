import { IsNotEmpty } from "class-validator";

export class CreateOwnerDto {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly phone: string;
  @IsNotEmpty()
  readonly address: string;
}