"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const fs_1 = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Item Auction API')
        .addBearerAuth()
        .setDescription('Web service for item auctions')
        .setVersion('1.0')
        .addTag('users')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/swagger', app, document);
    await app.listen(process.env.PORT || 3001);
    await app.use((req, res, next) => {
        const serverUrl = req.baseUrl;
        if (process.env.NODE_ENV === 'development') {
            const pathToSwaggerStaticFolder = (0, path_1.resolve)(process.cwd(), 'swagger-static');
            const pathToSwaggerJson = (0, path_1.resolve)(pathToSwaggerStaticFolder, 'swagger.json');
            const swaggerJson = JSON.stringify(document, null, 2);
            (0, fs_1.writeFileSync)(pathToSwaggerJson, swaggerJson);
            console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
        }
        next();
    });
}
bootstrap();
//# sourceMappingURL=main.js.map