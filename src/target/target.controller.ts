import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HttpGuard } from '../common/guards/http.guard';
import {event, target} from '@prisma/client';
import { HttpExceptionHandler } from '../common/exception.handlers';
import { TargetService } from './target.service';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import {PrismaService} from '../common/services/prisma.service';

@Controller('target')
export class TargetController {
  constructor(private targetService: TargetService, private prismaService: PrismaService) {}

  @UseGuards(HttpGuard)
  @Get()
  async listTarget(): Promise<target[]> {
    return await this.targetService.listTargets().catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Get(':id')
  async findTarget(@Param('id') id: string): Promise<target> {
    const target = await this.targetService
      .findTarget(id)
      .catch(HttpExceptionHandler);
    if (!target)
      throw new HttpException('Ziel konnte nicht gefunden werden.', 404);
    return target;
  }

  @UseGuards(HttpGuard)
  @Post()
  async createTarget(@Body() targetDto: CreateTargetDto): Promise<target> {
    return await this.targetService
      .createTarget(targetDto)
      .catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Patch(':id')
  async updateTarget(
    @Body() targetDto: UpdateTargetDto,
    @Param('id') id: string
  ): Promise<target> {
    return await this.targetService
      .updateTarget(id, targetDto)
      .catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Delete(':id')
  async deleteTarget(@Param('id') id: string): Promise<target> {
    return await this.targetService
      .deleteTarget(id)
      .catch(HttpExceptionHandler);
  }
}
