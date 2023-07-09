import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class ConvertCurrencyResponseDto {
  @ApiProperty({
    example: 100,
    description: 'Количество монет, из которых переводим',
  })
  amount: number;

  @ApiProperty({
    example: 'ethereum',
    description: 'Ключ монеты, из которой переводим',
  })
  from: string;

  @ApiProperty({
    example: 'bitcoin',
    description: 'Ключ монеты, в которую переводим',
  })
  to: string;

  @ApiProperty({
    example: 6.3,
    description: 'Количество монет, которое получили в результате перевода',
  })
  result: number;
}
