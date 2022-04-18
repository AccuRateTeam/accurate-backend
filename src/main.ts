import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { Logger } from './logger/logger.service';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as express from 'express';
import * as https from 'https';
import { ExtendedSocketIoAdapter } from './common/extended-socket.adapter';

dotenv.config();

async function bootstrap() {
  // certs
  const privateKey = fs.readFileSync('certs/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('certs/cert.pem', 'utf8');
  const httpsOptions = {key: privateKey, cert: certificate};

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const httpsServer = https.createServer(httpsOptions, server);
  app.useWebSocketAdapter(new ExtendedSocketIoAdapter(httpsServer));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // custom logger
  app.useLogger(app.get(Logger));

  // use helmet for security
  app.use(helmet());

  // TODO: implement
  // use csurf for csrf protection
  // app.use(csurf());

  // use validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
  httpsServer.listen(parseInt(process.env.PORT), '0.0.0.0', 100);
}
bootstrap();
