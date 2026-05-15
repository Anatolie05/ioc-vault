import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IocType, Severity } from '@prisma/client';

export class FilterIocDto {
  @IsOptional()
  @IsEnum(IocType)
  type?: IocType;

  @IsOptional()
  @IsEnum(Severity)
  severity?: Severity;

  @IsOptional()
  @IsString()
  search?: string;
}
