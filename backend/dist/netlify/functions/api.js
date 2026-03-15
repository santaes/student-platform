const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../../dist/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');
const serverlessExpress = require('@codegenie/serverless-express');
let cachedApp;
const handler = async (event, context) => {
    if (!cachedApp) {
        const expressApp = express();
        const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
        app.enableCors({
            origin: '*',
            credentials: true,
        });
        await app.init();
        cachedApp = serverlessExpress({ app: expressApp });
    }
    return cachedApp(event, context);
};
module.exports = { handler };
//# sourceMappingURL=api.js.map