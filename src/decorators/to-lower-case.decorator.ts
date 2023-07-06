import { Transform } from 'class-transformer';

export const ToLowerCase = (): PropertyDecorator =>
  Transform(({ value }: { value: string }) => value.toLowerCase());
