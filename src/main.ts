import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { assignUserMiddleware } from './auth/assignUser.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(assignUserMiddleware);
  await app.listen(3000);
}
bootstrap();
