import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import helmet from 'helmet';
import validationPipe from './utils/validationPipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const publicPath = join(__dirname, '../../client/public');
  app.useStaticAssets(publicPath);

  const PORT = process.env.PORT;
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.ORIGIN,
    credentials: true,
  });

  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(express.json({ limit: '50mb' }));

  app.useGlobalPipes(validationPipe);

  await app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
}

bootstrap();
