import 'dotenv/config';
import { NestFactory, FastifyAdapter } from '@nestjs/core';
import * as helmet from 'fastify-helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.register(helmet);

  app.enableCors({
    origin: ['http://localhost:8080', 'http://192.168.1.121:8080'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  await app.listen(process.env.NODE_PORT, process.env.NODE_HOST);
}

bootstrap().catch((err: Error) => {
  console.log(err.message, err.stack);
});
