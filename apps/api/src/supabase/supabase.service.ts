import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // o ANON KEY para lectura
    );
    // TEMPORAL: poner al final del constructor SOLO para probar
    console.log('Testing Supabase...', this.client);

    (async () => {
      const { data, error } = await this.client
        .from('weddings')
        .select('*')
        .limit(1);

      console.log('Test data:', data);
      console.log('Test error:', error);
    })();
  }

  getClient() {
    return this.client;
  }
}
