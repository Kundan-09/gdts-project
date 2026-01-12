import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  applicationType: string;

  @IsNotEmpty()
  @IsString()
  department: string;
}
