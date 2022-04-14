import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { target } from '@prisma/client';
import { ApiException } from '../common/exceptions/api.exception';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';

@Injectable()
export class TargetService {
  constructor(private prisma: PrismaService) {}

  public async listTargets(): Promise<target[]> {
    return await this.prisma.target.findMany();
  }

  public async findTarget(targetId: string): Promise<target> {
    return await this.prisma.target.findFirst({
      where: {
        target_id: targetId,
      },
    });
  }

  public async createTarget(targetDto: CreateTargetDto): Promise<target> {
    return await this.prisma.target.create({
      data: {
        target_name: targetDto.target_name,
      },
    });
  }

  public async updateTarget(
    targetId: string,
    targetDto: UpdateTargetDto
  ): Promise<target> {
    if (!(await this.findTarget(targetId))) {
      throw new ApiException('Ziel konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.target.update({
      where: {
        target_id: targetId,
      },
      data: {
        target_name: targetDto.target_name,
      },
    });
  }

  public async deleteTarget(targetId: string): Promise<target> {
    if (!(await this.findTarget(targetId))) {
      throw new ApiException('Ziel konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.target.delete({
      where: {
        target_id: targetId,
      },
    });
  }
}
