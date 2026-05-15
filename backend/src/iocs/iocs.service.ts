import { Injectable } from '@nestjs/common';
import { Ioc } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateIocDto } from './dto/create-ioc.dto';
import { FilterIocDto } from './dto/filter-ioc.dto';

@Injectable()
export class IocsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: FilterIocDto): Promise<Ioc[]> {
    return this.prisma.ioc.findMany({
      where: {
        ...(filter.type && { type: filter.type }),
        ...(filter.severity && { severity: filter.severity }),
        ...(filter.search && {
          value: { contains: filter.search, mode: 'insensitive' },
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateIocDto): Promise<Ioc> {
    return this.prisma.ioc.create({ data: dto });
  }

  async bulkCreate(dtos: CreateIocDto[]): Promise<{ count: number }> {
    return this.prisma.ioc.createMany({ data: dtos });
  }

  async remove(id: string): Promise<Ioc> {
    return this.prisma.ioc.delete({ where: { id } });
  }
}
