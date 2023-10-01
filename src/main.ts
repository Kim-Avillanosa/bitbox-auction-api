import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { resolve } from 'path';
import { writeFileSync, createWriteStream } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000/',
  });

  const config = new DocumentBuilder()
    .setTitle('Item Auction API')
    .addBearerAuth()
    .setDescription('Web service for item auctions')
    .setVersion('1.0')
    .addTag('users', 'user details management')
    .addTag('auth', 'authentication')
    .addTag('debit', 'account wallet management for deposits')
    .addTag('credit', 'account wallet management for withdrawals')
    .addTag('auction', 'manage auction, bids')
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
