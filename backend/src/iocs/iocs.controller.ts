import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Ioc } from '@prisma/client';
import { CreateIocDto } from './dto/create-ioc.dto';
import { FilterIocDto } from './dto/filter-ioc.dto';
import { IocsService } from './iocs.service';

@Controller('iocs')
export class IocsController {
  constructor(private readonly iocsService: IocsService) {}

  @Get()
  findAll(@Query() filter: FilterIocDto): Promise<Ioc[]> {
    return this.iocsService.findAll(filter);
  }

  @Post()
  create(@Body() dto: CreateIocDto): Promise<Ioc> {
    return this.iocsService.create(dto);
  }

  @Post('bulk')
  bulkCreate(
    @Body(new ParseArrayPipe({ items: CreateIocDto })) dtos: CreateIocDto[],
  ): Promise<{ count: number }> {
    return this.iocsService.bulkCreate(dtos);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.iocsService.remove(id);
  }
}
