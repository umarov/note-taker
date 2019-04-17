import '../scripts/env.js';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import * as helmet from 'fastify-helmet';

import { AppModule } from './app.module';
import { PinoLoggerService, logger } from './shared/pino-logger.service';

const origin = process.env.NODE_ENV === 'development' ? '*' : [];

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({ logger });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { logger: new PinoLoggerService() }
  );
  app.register(helmet);

  app.enableCors({
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  await app.listen(process.env.NODE_PORT, process.env.NODE_HOST);
}

bootstrap().catch((err: Error) => {
  logger.error(err.message, err.stack);
});

process.on('uncaughtException', (err) => {
  logger.error(`There was an uncaught exception\n${err}`);
});
