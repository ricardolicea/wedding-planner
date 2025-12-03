import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { GuestsModule } from './guests/guests.module';


@Module({
  imports: [SupabaseModule, ConfigModule.forRoot({
      isGlobal: true, // <-- 🔥 Carga .env automáticamente
    }), GuestsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
