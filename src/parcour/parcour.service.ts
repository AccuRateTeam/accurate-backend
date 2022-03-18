import {HttpException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateEventDto} from "../event/dto/create-event.dto";
import {parcour} from "@prisma/client";
import {UpdateEventDto} from "../event/dto/update-event.dto";
import {CreateParcourDto} from "./dto/create-parcour.dto";
import {UpdateParcourDto} from "./dto/update-parcour.dto";

@Injectable()
export class ParcourService {
    constructor(
        private prisma: PrismaService
    ) {
    }

    public async listParcours(): Promise<parcour[]> {
        return await this.prisma.parcour.findMany();
    }

    public async createParcour(parcourDto: CreateParcourDto): Promise<parcour> {
        return await this.prisma.parcour.create({
            data: {
                parcour_name: parcourDto.parcour_name
            }
        });
    }

    public async updateParcour(parcourDto: UpdateParcourDto, parcourId: string): Promise<parcour> {
        if (!(await this.findParcour(parcourId))) {
            throw new HttpException('Parkour konnte nicht gefunden werden.', 400);
        }

        return await this.prisma.parcour.update({
            where: {
                parcour_id: parcourId
            },
            data: {
                parcour_name: parcourDto.parcour_name
            }
        });
    }

    public async findParcour(parcourId: string): Promise<parcour> {
        return await this.prisma.parcour.findFirst({
            where: {
                parcour_id: parcourId
            }
        });
    }

    public async deleteParcour(parcourId: string): Promise<parcour> {
        if (!(await this.findParcour(parcourId))) {
            throw new HttpException('Parkour konnte nicht gefunden werden.', 400);
        }

        return await this.prisma.parcour.delete({
            where: {
                parcour_id: parcourId
            }
        });
    }
}
