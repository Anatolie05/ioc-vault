import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IocsModule } from './iocs/iocs.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [IocsModule, HealthModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
