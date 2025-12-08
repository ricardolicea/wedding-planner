import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
    'http://localhost:5173',           // dev front
    'https://TU-DOMINIO-FRONT.vercel.app', // prod front, después lo ajustamos
  ],
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
