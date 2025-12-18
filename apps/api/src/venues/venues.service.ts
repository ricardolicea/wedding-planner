import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { mapVenueDtoToRow, VenueDto } from './VenueDto';

@Injectable()
export class VenuesService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async findAll(weddingId: string) {
        const { data, error } = await this.supabaseService.getClient()
            .from('venues')
            .select('*')
            .eq('wedding_id', weddingId);

        if (error) {
            throw new Error(`Error fetching venues: ${error.message}`);
        }

        return data;
    }

    async createVenue(weddingId: string, venueData: VenueDto) {
        const { data, error } = await this.supabaseService.getClient()
            .from('venues')
            .insert([{ ...venueData, wedding_id: weddingId }])
            .single();

        if (error) {
            throw new Error(`Error creating venue: ${error.message}`);
        }

        return data;
    }
    async getVenueById(venueId: string) {
        const { data, error } = await this.supabaseService.getClient()
            .from('venues')
            .select('*')
            .eq('id', venueId)
            .single();

        if (error) {
            throw new Error(`Error fetching venue: ${error.message}`);
        }

        return data;
    }

    async updateVenue(venueId: string, updatedData: VenueDto) {
        const { data, error } = await this.supabaseService.getClient()
            .from('venues')
            .update(mapVenueDtoToRow(updatedData))
            .eq('id', venueId)
            .single();

        if (error) {
            throw new Error(`Error updating venue: ${error.message}`);
        }

        return data;
    }
}
