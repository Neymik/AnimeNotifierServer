import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let animeScrapper = require('./animeScrapper')

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(1337);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

