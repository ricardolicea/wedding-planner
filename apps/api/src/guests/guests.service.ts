import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

export interface CreateGuestDto {
   id: string;
    firstname: string;
    lastname?: string;
    email: string;
    phone: string;
    relation: string;
    hasPlusOne: boolean;
    notes: string;
    rsvpStatus: 'accepted' | 'declined' | 'pending';
    dietaryNotes: string;
    createdAt: string;
    updatedAt: string;
    invitedBy: string;
    listtype: string;
}
// apps/api/src/guests/guests.service.ts

type GuestRow = {
  id: string;
  wedding_id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string;
  relation: string;
  invited_by: string;
  listtype: string;
  has_plus_one: boolean;
  rsvp_status: string;
  notes: string;
  dietary_notes: string;
  created_at: string;
  updated_at: string;
};

function mapGuestRowToDto(row: GuestRow): CreateGuestDto {
  return {
    id: row.id,
    firstname: row.first_name,
    lastname: row.last_name ?? '',
    email: row.email,
    phone: row.phone,
    relation: row.relation,
    hasPlusOne: row.has_plus_one,
    notes: row.notes,
    rsvpStatus: row.rsvp_status.toLowerCase() as
      | 'accepted'
      | 'declined'
      | 'pending',
    dietaryNotes: row.dietary_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    invitedBy: row.invited_by,
    listtype: row.listtype,
  };
}

@Injectable()
export class GuestsService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAllGuestsByWedding(weddingId: string): Promise<CreateGuestDto[]> {
        const client = this.supabase.getClient();

    const { data, error } = await client
      .from('guests')
      .select('*')
      .eq('wedding_id', weddingId)
      .order('first_name', { ascending: true });


    if (error) {
      throw new Error(`Error fetching guests: ${error.message}`);
    }

    return (data as GuestRow[]).map(mapGuestRowToDto);
  }

  async createGuestForWedding(
    weddingId: string,
    body: CreateGuestDto,
  ): Promise<void> {
        const client = this.supabase.getClient();

    const { data, error } = await client
      .from('guests')
      .insert({
        wedding_id: weddingId,
        firstname: body.firstname,
        lastname: body.lastname ?? null,
        email: body.email ?? null,
        phone: body.phone ?? null,
        relation: body.relation ?? null,
        has_plus_one: body.hasPlusOne ?? false,
        notes: body.notes ?? null,
        dietary_notes: body.dietaryNotes ?? null,
      })
      .select('*')
      .single();

    if (error) {
      throw new Error(`Error creating guest: ${error.message}`);
    }
    return data
  }
}
