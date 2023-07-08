import Decimal from 'decimal.js';
import { isNumber } from './is-number';

/**
 * @description Конвертирует amount монет по цене fromPrice в монеты по цене toPrice
 * @param param0.fromPrice - цена монеты, из которой конвертируем
 * @param param0.amount - количество монет, из которых конвертируем
 * @param param0.toPrice - цена монеты, в которую конвертируем
 * @returns Количество монет по цене toPrice, которые можно купить за amount монет по цене fromPrice
 */
export const convertPrice = ({
  fromPrice,
  toPrice,
  amount,
}: {
  fromPrice: number;
  toPrice: number;
  amount: number;
}): number => {
  if (!isNumber(fromPrice) || !isNumber(toPrice) || !isNumber(amount)) {
    throw new Error('Some param(s) is not number');
  }

  return new Decimal(amount)
    .mul(new Decimal(fromPrice))
    .div(toPrice)
    .toNumber();
};
