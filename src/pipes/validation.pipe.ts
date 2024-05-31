import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

// Назанчение пипов - преобразование входящих данных и их валидация
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value); // получить тело запроса
    const errors = await validate(obj);

    if (errors.length) {
      let messages = errors.map((err) => `${err.property} - ${Object.values(err.constraints).join(', ')}`);
      throw new ValidationException(messages);
    }
  }
}
