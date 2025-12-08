import { Module } from '@nestjs/common';
import { SupabaseAdminService } from '../supabase/supabase-admin.service';
import { AdminUsersController } from './admin.controller';

@Module({
  providers: [SupabaseAdminService],
  controllers: [AdminUsersController],
})
export class AdminModule {}
