import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { mapVenueDtoToRow, mapVenueRowToDto, VenueDto } from './VenueDto';

@Injectable()
export class VenuesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(weddingId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('venues')
      .select('*')
      .eq('wedding_id', weddingId);

    if (error) {
      throw new Error(`Error fetching venues: ${error.message}`);
    }

    return data;
  }

  async createVenue(weddingId: string, venueData: VenueDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('venues')
      .insert([mapVenueDtoToRow({ ...venueData, weddingId })])
      .single();

    if (error) {
      throw new Error(`Error creating venue: ${error.message}`);
    }

    return data;
  }
  async getVenueById(venueId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('venues')
      .select('*')
      .eq('id', venueId)
      .single();

    if (error) {
      throw new Error(`Error fetching venue: ${error.message}`);
    }

    return mapVenueRowToDto(data);
  }

  async updateVenue(venueId: string, venue: VenueDto) {   
    const { data, error } = await this.supabaseService
      .getClient()
      .from('venues')
      .update({
        venue_name: venue.venueName,
        year_price: venue.yearPrice,
        hours: venue.hours,
        rent_service_price: venue.rentServicePrice,
        civil_description: venue.civilDescription,
        corkage: venue.corkage,
        plate_price: venue.platePrice,
        plate_upgrade_price: venue.plateUpgradePrice,
        alcohol_package_price: venue.alcoholPackagePrice,
        alcohol_upgrade_price: venue.alcoholUpgradePrice,
        late_night_snack_price: venue.lateNightSnackPrice,
        extra_hour_price: venue.extraHourPrice,
        valet_parking_price: venue.valetParkingPrice,
        rsv_charge: venue.rsvCharge,
        guaranty_deposit: venue.guarantyDeposit,
      })
      .eq('id', venueId)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Error updating venue: ${error.message}`);
    }

    return data;
  }
}
