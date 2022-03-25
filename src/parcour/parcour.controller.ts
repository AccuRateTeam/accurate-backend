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
import { parcour } from '@prisma/client';
import { ParcourService } from './parcour.service';
import { CreateParcourDto } from './dto/create-parcour.dto';
import { UpdateParcourDto } from './dto/update-parcour.dto';
import { HttpGuard } from '../common/guards/http.guard';
import { HttpExceptionHandler } from '../common/exception.handlers';

@Controller('parcour')
export class ParcourController {
  constructor(private parcourService: ParcourService) {}

  @UseGuards(HttpGuard)
  @Get()
  async listParcours(): Promise<parcour[]> {
    return await this.parcourService.listParcours().catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Get(':id')
  async findParcour(@Param('id') id: string): Promise<parcour> {
    const parcour = await this.parcourService
      .findParcour(id)
      .catch(HttpExceptionHandler);
    if (!parcour)
      throw new HttpException('Parkour konnte nicht gefunden werden.', 404);
    return parcour;
  }

  @UseGuards(HttpGuard)
  @Post()
  async createParcour(@Body() parcourDto: CreateParcourDto): Promise<parcour> {
    return await this.parcourService
      .createParcour(parcourDto)
      .catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Patch(':id')
  async updateParcour(
    @Body() parcourDto: UpdateParcourDto,
    @Param('id') id: string
  ): Promise<parcour> {
    return await this.parcourService
      .updateParcour(id, parcourDto)
      .catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Delete(':id')
  async deleteParcour(@Param('id') id: string): Promise<parcour> {
    return await this.parcourService
      .deleteParcour(id)
      .catch(HttpExceptionHandler);
  }
}
