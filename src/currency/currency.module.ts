import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [HttpModule],
})
export class CurrencyModule {}
