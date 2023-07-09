import { from } from 'rxjs';
import { Currency } from 'src/currency/types/currency.type';

/**
 * @description Ищет токены по заданным ключам в переданном масиве
 * @param currencies - массив курсов токенов
 * @param keys - ключи токенов, которые ищем
 * @returns объект с курсами токенов, если они были найдены
 */
export const findTokenInCurrencies = (
  currencies: Currency[],
  keys: { from: string; to: string },
): { fromCurrency?: Currency; toCurrency?: Currency } => {
  let fromCurrency: Currency = null,
    toCurrency: Currency = null;

  for (const currency of currencies) {
    if (currency.key === keys.from) {
      fromCurrency = currency;
    }

    if (currency.key === keys.to) {
      toCurrency = currency;
    }

    if (fromCurrency && toCurrency) {
      return { fromCurrency, toCurrency };
    }
  }

  return { fromCurrency, toCurrency };
};
