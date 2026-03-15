"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
let cachedApp;
const handler = async (event, context) => {
    if (!cachedApp) {
        const expressApp = (0, express_1.default)();
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        app.enableCors({
            origin: '*',
            credentials: true,
        });
        await app.init();
        cachedApp = expressApp;
    }
    return cachedApp(event, context);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map