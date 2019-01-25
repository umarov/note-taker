import 'dotenv/config';
import { NestFactory, FastifyAdapter } from '@nestjs/core';
import * as helmet from 'fastify-helmet';
import { AppModule } from './app.module';

const origin = process.env.NODE_ENV === 'development' ? '*' : [];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
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
  console.log(err.message, err.stack);
});
