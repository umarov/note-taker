"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const helmet = require("fastify-helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new core_1.FastifyAdapter());
    app.register(helmet);
    app.enableCors({
        origin: 'http://localhost:8080',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    });
    await app.listen(process.env.NODE_PORT, process.env.NODE_HOST);
}
bootstrap().catch((err) => {
    console.log(err.message, err.stack);
});
//# sourceMappingURL=main.js.map