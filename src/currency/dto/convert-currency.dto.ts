import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ToLowerCase } from '../../decorators/to-lower-case.decorator';

export class ConvertCurrencyDto {
  @IsNotEmpty()
  @ToLowerCase()
  from: string;

  @IsOptional()
  @ToLowerCase()
  to?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value, { toClassOnly: true })
  amount?: number;
}
