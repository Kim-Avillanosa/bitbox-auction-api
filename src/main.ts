import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as path from 'path';
import { writeFileSync, createWriteStream } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Item Auction API')
    .addBearerAuth()
    .setDescription('Web service for item auctions')
    .setVersion('1.0')
    .addTag('users', 'User details management')
    .addTag('auth', 'Authentication')
    .addTag('debit', 'Account wallet management for deposits')
    .addTag('credit', 'Account wallet management for withdrawals')
    .addTag('auction', 'Manage auction, bids')
    .addTag('cron', 'Make scheduled requests')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-standalone-preset.js',
    ],
  });

  await app.use((req, res, next) => {
    // get the swagger json file (if app is running in development mode)
    if (process.env.NODE_ENV === 'development') {
      const outputPath = path.resolve(
        process.cwd(),
        'src',
        'docs',
        'swagger.json',
      );
      writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' });
    }
    next();
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
