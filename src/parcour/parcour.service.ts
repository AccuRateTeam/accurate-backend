import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { parcour } from '@prisma/client';
import { CreateParcourDto } from './dto/create-parcour.dto';
import { UpdateParcourDto } from './dto/update-parcour.dto';
import { ApiException } from '../common/exceptions/api.exception';

@Injectable()
export class ParcourService {
  constructor(private prisma: PrismaService) {}

  public async listParcours(): Promise<parcour[]> {
    return await this.prisma.parcour.findMany();
  }

  public async findParcour(parcourId: string): Promise<parcour> {
    return await this.prisma.parcour.findFirst({
      where: {
        parcour_id: parcourId,
      },
    });
  }

  public async createParcour(parcourDto: CreateParcourDto): Promise<parcour> {
    return await this.prisma.parcour.create({
      data: {
        parcour_name: parcourDto.parcour_name,
      },
    });
  }

  public async updateParcour(
    parcourId: string,
    parcourDto: UpdateParcourDto
  ): Promise<parcour> {
    if (!(await this.findParcour(parcourId))) {
      throw new ApiException('Parkour konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.parcour.update({
      where: {
        parcour_id: parcourId,
      },
      data: {
        parcour_name: parcourDto.parcour_name,
      },
    });
  }

  public async deleteParcour(parcourId: string): Promise<parcour> {
    if (!(await this.findParcour(parcourId))) {
      throw new ApiException('Parkour konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.parcour.delete({
      where: {
        parcour_id: parcourId,
      },
    });
  }
}
