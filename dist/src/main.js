"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path = require("path");
const fs_1 = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const outputPath = path.resolve(process.cwd(), 'docs', 'swagger.json');
    (0, fs_1.writeFileSync)(outputPath, JSON.stringify(document), { encoding: 'utf8' });
    swagger_1.SwaggerModule.setup('/swagger', app, document, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.css',
    });
    await app.listen(process.env.PORT || 3001);
    await app.use((req, res, next) => {
        if (process.env.NODE_ENV === 'development') {
        }
        next();
    });
}
bootstrap();
//# sourceMappingURL=main.js.map