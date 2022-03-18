import { Module } from '@nestjs/common';
import { ParcourController } from './parcour.controller';
import { ParcourService } from './parcour.service';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [ParcourController],
  providers: [PrismaService, ParcourService]
})
export class ParcourModule {}
