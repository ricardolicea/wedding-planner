import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { GuestsModule } from './guests/guests.module';
import { AdminModule } from './admin/admin.module';
import { WeddingsModule } from './weddings/weddings.module';
import { VenuesModule } from './venues/venues.module';


@Module({
  imports: [
    SupabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (() => {
        switch (process.env.NODE_ENV) {
          case 'production':
            return '.env.production.local';
          case 'development':
            return '.env.development.local';
          default:
            return '.env';
        }
      })(),
    }),
    GuestsModule,
    AdminModule,
    WeddingsModule,
    VenuesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
