import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
