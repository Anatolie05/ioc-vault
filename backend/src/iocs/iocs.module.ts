import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IocsController } from './iocs.controller';
import { IocsService } from './iocs.service';

@Module({
  controllers: [IocsController],
  providers: [IocsService, PrismaService],
})
export class IocsModule {}
