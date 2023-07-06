import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { ConvertCurrencyResponseDto } from './dto/convert-currency-response.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert')
  convert(
    @Query(new ValidationPipe({ transform: true }))
    query: ConvertCurrencyDto,
  ): Promise<ConvertCurrencyResponseDto> {
    return this.currencyService.convert(query);
  }
}
