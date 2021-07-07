import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AnimeScrapper } from './animeScrapper';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly animeScrapper: AnimeScrapper
    
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ongoing')
  getOngoing() {
    return this.animeScrapper.getOngoings();
  }

}
