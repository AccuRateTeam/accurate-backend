import { Module } from '@nestjs/common';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [TargetController],
  providers: [PrismaService, TargetService],
})
export class TargetModule {}
