import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as csurf from 'csurf';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use helmet for security
  app.use(helmet());

  // TODO: implement
  // use csurf for csrf protection
  // app.use(csurf());

  // use validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
