import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const frontendOrigin = configService.get<string>('FRONTEND_ORIGIN');

  app.enableCors({
    origin: frontendOrigin,
    credentials: true, // Si usás cookies o headers con auth
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
