import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService], // 🔥 importante para usarlo en otros módulos
})
export class SupabaseModule {}
