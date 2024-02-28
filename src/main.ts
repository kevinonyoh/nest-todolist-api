/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.use(loggerMiddleware);

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();