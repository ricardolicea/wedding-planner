import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { GuestsModule } from './guests/guests.module';
import { AdminModule } from './admin/admin.module';
import { WeddingsModule } from './weddings/weddings.module';


@Module({
  imports: [SupabaseModule, ConfigModule.forRoot({
      isGlobal: true, // <-- 🔥 Carga .env automáticamente
    }), GuestsModule, AdminModule, WeddingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
