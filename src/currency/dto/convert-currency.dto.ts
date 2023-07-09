import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ToLowerCase } from '../../decorators/to-lower-case.decorator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { DEFAULT_AMOUNT, DEFAULT_TOKEN } from '../constants';

export class ConvertCurrencyDto {
  @ApiProperty({
    example: 'ethereum',
    description: 'Ключ монеты, из которой переводим',
  })
  @IsNotEmpty()
  @ToLowerCase()
  from: string;

  @ApiPropertyOptional({
    example: 'bitcoin',
    description: 'Ключ монеты, в которую переводим',
    default: DEFAULT_TOKEN,
  })
  @IsOptional()
  @ToLowerCase()
  to?: string;

  @ApiPropertyOptional({
    example: 100,
    description: 'Количество монет, из которых переводим',
    default: DEFAULT_AMOUNT,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value, { toClassOnly: true })
  amount?: number;
}
