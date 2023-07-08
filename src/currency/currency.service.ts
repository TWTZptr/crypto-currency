import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { CURRENCY_API_URL, DEFAULT_AMOUNT, DEFAULT_TOKEN } from './constants';
import { firstValueFrom } from 'rxjs';
import { ConvertCurrencyResponseDto } from './dto/convert-currency-response.dto';
import { CurrencyApiResponse } from './types/currency-api-response.type';
import { Currency } from './types/currency.type';
import { getTokenZeroPriceMsg, getUnexistTokenMsg } from './error-messages';
import { convertPrice } from 'src/utils/convert-price';

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  async convert({
    from,
    to = DEFAULT_TOKEN,
    amount = DEFAULT_AMOUNT,
  }: ConvertCurrencyDto): Promise<ConvertCurrencyResponseDto> {
    const { data }: { data: CurrencyApiResponse } = await firstValueFrom(
      this.httpService.get<CurrencyApiResponse>(CURRENCY_API_URL),
    );

    const fromCurrency: Currency | undefined = data.data.find(
      (currency: Currency) => currency.key === from,
    );
    if (!fromCurrency) {
      throw new BadRequestException(getUnexistTokenMsg(from));
    }

    const toCurrency: Currency | undefined = data.data.find(
      (currency: Currency) => currency.key === to,
    );
    if (!toCurrency) {
      throw new BadRequestException(getUnexistTokenMsg(to));
    }

    if (!toCurrency.price) {
      throw new BadRequestException(getTokenZeroPriceMsg(to));
    }

    const result: number = convertPrice({
      fromPrice: fromCurrency.price,
      toPrice: toCurrency.price,
      amount,
    });

    return { result, amount, to, from };
  }
}
