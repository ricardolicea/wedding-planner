import { Controller, Put } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { type VenueDto } from './VenueDto';

@Controller(':weddingId/venues')
export class VenuesController {
    constructor(private readonly venuesService: VenuesService) {}


    @Get()
    findAll(@Param('weddingId') weddingId: string) {
        return this.venuesService.findAll(weddingId);
    }

    @Post()
    createVenue(@Param('weddingId') weddingId: string, @Body() venueData: VenueDto) {
        return this.venuesService.createVenue(weddingId, venueData);
    }
    
    @Get(':venueId')
    getVenueById(@Param('venueId') venueId: string) {
        return this.venuesService.getVenueById(venueId);
    }
    @Put(':venueId')
    updateVenue(
        @Param('venueId') venueId: string,
        @Param('weddingId') weddingId: string,
        @Body() updatedData: VenueDto,
    ) {
        return this.venuesService.updateVenue(venueId, {...updatedData, weddingId: weddingId});
    }
}
