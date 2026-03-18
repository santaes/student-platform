"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const path_1 = require("path");
if (!globalThis.crypto?.randomUUID) {
    globalThis.crypto = {
        randomUUID: () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        subtle: undefined,
        getRandomValues: undefined,
    };
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const httpAdapter = app.getHttpAdapter();
    const instance = httpAdapter.getInstance();
    instance.use((req, res, next) => {
        console.log(`Middleware called for path: ${req.path}`);
        if (req.path === '/' || req.path === '/health') {
            console.log('Health middleware responding');
            res.status(200).json({
                status: 'ok',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            });
            return;
        }
        next();
    });
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Student Learning Platform API')
        .setDescription('API documentation for Student Learning Platform')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger documentation available at: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map