import { NestFactory, Reflector } from '@nestjs/core';
import { Logger, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
