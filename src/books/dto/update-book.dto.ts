import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  age: number;
}
