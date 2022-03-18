import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {EventService} from "../event/event.service";
import {AuthGuard} from "@nestjs/passport";
import {event, parcour} from "@prisma/client";
import {CreateEventDto} from "../event/dto/create-event.dto";
import {UpdateEventDto} from "../event/dto/update-event.dto";
import {ParcourService} from "./parcour.service";
import {CreateParcourDto} from "./dto/create-parcour.dto";
import {UpdateParcourDto} from "./dto/update-parcour.dto";

@Controller('parcour')
export class ParcourController {
    constructor(
        private parcourService: ParcourService
    ) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async listParcours(): Promise<parcour[]> {
        return await this.parcourService.listParcours();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findParcour(@Param('id') id: string): Promise<parcour> {
        return await this.parcourService.findParcour(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createParcour(@Body() parcourDto: CreateParcourDto): Promise<parcour> {
        return await this.parcourService.createParcour(parcourDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateParcour(@Body() parcourDto: UpdateParcourDto, @Param('id') id: string): Promise<parcour> {
        return this.parcourService.updateParcour(parcourDto, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteParcour(@Param('id') id: string): Promise<parcour> {
        return this.parcourService.deleteParcour(id);
    }
}
