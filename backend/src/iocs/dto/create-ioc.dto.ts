import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IocType, Severity } from '@prisma/client';

export class CreateIocDto {
  @IsString()
  @IsNotEmpty()
  value!: string;

  @IsEnum(IocType)
  type!: IocType;

  @IsEnum(Severity)
  severity!: Severity;

  @IsOptional()
  @IsString()
  notes?: string;
}
