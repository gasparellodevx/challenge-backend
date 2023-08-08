import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import type { Env } from './shared/infra/env/utils/validate-env.util';
import { ValidationPipe } from '@nestjs/common';
import { ACCESS_TOKEN_SECURITY_NAME } from './modules/auth/auth.constants';
import cluster from 'cluster';
import { cpus } from 'os';
import { LogInterceptor } from './shared/infra/log/interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logInterceptor = app.get(LogInterceptor);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(logInterceptor);

  const configService = app.get(ConfigService<Env>);

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('STUDENTS')
    .addTag('AUTH')
    .addTag('COURSES')
    .addTag('LOG')
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

const cpuCount = Math.floor(cpus().length / 2);

if (cpuCount > 1 && cluster.isPrimary) {
  console.log(`Master cluster setting up ${cpuCount} workers...`);

  for (let i = 0; i < cpuCount; i++) cluster.fork();
} else {
  bootstrap();
}
