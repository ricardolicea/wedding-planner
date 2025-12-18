import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

export interface Wedding {
  id: string;
  name: string;
  date: string;
  location: string;
  currency: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
@Injectable()
export class WeddingsService {
    constructor(private readonly supabase: SupabaseService) {}
    async getWeddings() : Promise<Wedding[]>{
        // Lógica para obtener las bodas
        const client = this.supabase.getClient();
        
    const { data } = await client
      .from('weddings')
      .select('*')
      .order('date', { ascending: true });

      return data || [];
    }

    createWedding() {
        // Lógica para crear una boda
    }
}
