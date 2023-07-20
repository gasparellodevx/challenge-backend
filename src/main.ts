import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import type { Env } from './shared/infra/env/utils/validate-env.util';
import { ValidationPipe } from '@nestjs/common';
import { ACCESS_TOKEN_SECURITY_NAME } from './modules/auth/auth.constants';
import cluster from 'cluster';
import { cpus } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const configService = app.get(ConfigService<Env>);

  const config = new DocumentBuilder()
    .setTitle('NestJS API Challenge Xgrow')
    .setDescription('The NestJS API Challenge Xgrow description')
    .setVersion('1.0')
    .addTag('STUDENTS')
    .addTag('AUTH')
    .addTag('COURSES')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
      },
      ACCESS_TOKEN_SECURITY_NAME,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('PORT'));
}

const cpuCount = cpus().length;

if (cpuCount > 1 && cluster.isPrimary) {
  console.log(`Master cluster setting up ${cpuCount} workers...`);

  for (let i = 0; i < cpuCount; i++) cluster.fork();
} else {
  bootstrap();
}
