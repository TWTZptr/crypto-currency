import { convertPrice } from './convert-price';

test('20 tokens with price 1 equal 10 tokens with price 2', () => {
  expect(convertPrice({ fromPrice: 1, amount: 20, toPrice: 2 })).toBe(10);
});

test('0 tokens equals 0 tokens', () => {
  expect(convertPrice({ fromPrice: 1, amount: 0, toPrice: 2 })).toBe(0);
});

test('Negative fromPrice throws an error', () => {
  expect(() => convertPrice({ fromPrice: -1, amount: 1, toPrice: 1 })).toThrow(
    'Price/amount cannot be less than 0',
  );
});

test('Negative amount throws an error', () => {
  expect(() => convertPrice({ fromPrice: 0, amount: -1, toPrice: 1 })).toThrow(
    'Price/amount cannot be less than 0',
  );
});

test('Negative toPrice throws an error', () => {
  expect(() => convertPrice({ fromPrice: 1, amount: 1, toPrice: -1 })).toThrow(
    'Price/amount cannot be less than 0',
  );
});

test('Precision loss test (0.1 * 3 !== 0.30000000000000004)', () => {
  expect(convertPrice({ fromPrice: 0.1, amount: 3, toPrice: 0.3 })).toBe(1);
});
