import { Module } from '@nestjs/common';
import { WeddingsService } from './weddings.service';
import { WeddingsController } from './weddings.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  providers: [WeddingsService, SupabaseService],
  controllers: [WeddingsController]
})
export class WeddingsModule {}
