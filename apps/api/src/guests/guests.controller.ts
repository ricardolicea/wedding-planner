import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { GuestsService } from './guests.service';
import type { CreateGuestDto } from './guests.service';

@Controller('wedding/:weddingId/guests')
export class GuestsController {
    constructor(private readonly guestsService: GuestsService) {}

    @Get()
    findAll(@Param('weddingId') weddingId: string) {
        return this.guestsService.findAllGuestsByWedding(weddingId);
    }
    @Post()
    createGuest(
        @Param('weddingId') weddingId: string,
        @Body() body: CreateGuestDto,
    ) {
        return this.guestsService.createGuestForWedding(weddingId, body);
    }

   

    @Put(':guestId')
    editGuest(
        @Param('weddingId') weddingId: string,
        @Param('guestId') guestId: string,
        @Body() updatedData: CreateGuestDto,
    ) {
        console.log('Editing guest:', weddingId, guestId, updatedData);
        return this.guestsService.editGuestForWedding(weddingId, guestId, updatedData);
    }   
}
