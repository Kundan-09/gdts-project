import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateApprovalLogDto {
  @IsInt()
  applicationId: number;

  @IsInt()
  actionByUserId: number;

  @IsString()
  action: string; // APPROVED / REJECTED / FORWARDED

  @IsOptional()
  @IsString()
  remarks?: string;
}
