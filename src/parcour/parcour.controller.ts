import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {parcour} from "@prisma/client";
import {ParcourService} from "./parcour.service";
import {CreateParcourDto} from "./dto/create-parcour.dto";
import {UpdateParcourDto} from "./dto/update-parcour.dto";
import {HttpGuard} from '../authz/http.guard';

@Controller('parcour')
export class ParcourController {
    constructor(
        private parcourService: ParcourService
    ) {
    }

    @UseGuards(HttpGuard)
    @Get()
    async listParcours(): Promise<parcour[]> {
        return await this.parcourService.listParcours();
    }

    @UseGuards(HttpGuard)
    @Get(':id')
    async findParcour(@Param('id') id: string): Promise<parcour> {
        return await this.parcourService.findParcour(id);
    }

    @UseGuards(HttpGuard)
    @Post()
    async createParcour(@Body() parcourDto: CreateParcourDto): Promise<parcour> {
        return await this.parcourService.createParcour(parcourDto);
    }

    @UseGuards(HttpGuard)
    @Patch(':id')
    async updateParcour(@Body() parcourDto: UpdateParcourDto, @Param('id') id: string): Promise<parcour> {
        return this.parcourService.updateParcour(parcourDto, id);
    }

    @UseGuards(HttpGuard)
    @Delete(':id')
    async deleteParcour(@Param('id') id: string): Promise<parcour> {
        return this.parcourService.deleteParcour(id);
    }
}
