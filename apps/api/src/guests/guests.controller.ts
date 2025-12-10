import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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
        @Body() body: any,
    ) {
        return this.guestsService.createGuestForWedding(weddingId, body);
    }

    @Post('/edit/:guestId')
    editGuest(
        @Param('weddingId') weddingId: string,
        @Param('guestId') guestId: string,
        @Body() body: CreateGuestDto,
    ) {
        console.log('Editing guest:', guestId, 'for wedding:', weddingId);
        console.log('With body:', body);
        return this.guestsService.editGuestForWedding(weddingId, guestId, body);
    }
}
