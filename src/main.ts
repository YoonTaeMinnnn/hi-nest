import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 유효검사용 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //데코레이터가 없는 property에는 저장 x
      forbidNonWhitelisted: true, // dto에 존재하지 않는 property를 포함하는 경우, 요청 차단
      transform: true, // spring:httpmessageconvertor역할 ("3" -> 3)
    }),
  );
  // whitelist, forbidNonWhitelisted : 같이 사용해야함.
  await app.listen(3000);
}
bootstrap();
