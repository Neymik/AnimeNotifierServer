import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimeScrapper } from './animeScrapper';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AnimeScrapper],
})
export class AppModule {}
