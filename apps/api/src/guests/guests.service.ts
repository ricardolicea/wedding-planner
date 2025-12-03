import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

export interface CreateGuestDto {
  name: string;
  email?: string;
  phone?: string;
  relation?: string;
  hasPlusOne?: boolean;
  notes?: string;
  dietaryNotes?: string;
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
      .order('name', { ascending: true });


    if (error) {
      throw new Error(`Error fetching guests: ${error.message}`);
    }

    return data || [];
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
        name: body.name,
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
