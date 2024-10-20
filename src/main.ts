import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import {ConfigService} from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Block API')
    .setDescription('Block API for lesson')
    .setVersion('0.1')
    .addTag('API')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(port);
}
bootstrap();
