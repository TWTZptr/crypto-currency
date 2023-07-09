import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { ConvertCurrencyResponseDto } from './dto/convert-currency-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert')
  @ApiOperation({ summary: 'Конвертация amount токенов from в токен to' })
  @ApiResponse({ status: 200, type: ConvertCurrencyResponseDto })
  convert(
    @Query(new ValidationPipe({ transform: true }))
    query: ConvertCurrencyDto,
  ): Promise<ConvertCurrencyResponseDto> {
    return this.currencyService.convert(query);
  }
}
