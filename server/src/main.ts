import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      disableErrorMessages:
        configService.get('nodeEnv') === 'prod' ? true : false,
    }),
  );
  app.enableCors(configService.get('corsOptions'));

  await app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
  });
}
bootstrap();
