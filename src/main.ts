import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as path from 'path';
import { writeFileSync, createWriteStream } from 'fs';
import { addSwagger } from './docs/addSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  addSwagger(app);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
