import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  //Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Chỉ cho phép các property được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Throw error nếu có property không được định nghĩa
      transform: true, // Tự động transform type
      transformOptions: {
        enableImplicitConversion: true, // Tự động convert type
      },
    }),
  );
  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL của frontend
    credentials: true, // Cho phép gửi cookie
  });

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
