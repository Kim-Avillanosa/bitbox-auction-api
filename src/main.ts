import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { resolve } from 'path';
import { writeFileSync, createWriteStream } from 'fs';
import moment from 'moment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  moment.tz.setDefault('Asia/Singapore');

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
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT || 3001);

  await app.use((req, res, next) => {
    const serverUrl = req.baseUrl;

    // get the swagger json file (if app is running in development mode)
    if (process.env.NODE_ENV === 'development') {
      const pathToSwaggerStaticFolder = resolve(
        process.cwd(),
        'swagger-static',
      );

      // write swagger json file
      const pathToSwaggerJson = resolve(
        pathToSwaggerStaticFolder,
        'swagger.json',
      );
      const swaggerJson = JSON.stringify(document, null, 2);
      writeFileSync(pathToSwaggerJson, swaggerJson);
      console.log(
        `Swagger JSON file written to: '/swagger-static/swagger.json'`,
      );
    }

    next();
  });
}
bootstrap();
