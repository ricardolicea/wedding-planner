import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
      console.error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing', {
        url,
        hasKey: !!serviceRoleKey,
      });
      throw new Error('Missing Supabase env vars');
    }

    this.client = createClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  getClient() {
    return this.client;
  }
}
