import {
  ValidationArguments,
  ValidatorConstraint,
  registerDecorator,
  type ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  public validate(value: Date, args: ValidationArguments) {
    const [propName] = args.constraints;

    (args.object as any)[propName] =
      (args.object as any)[propName] ?? new Date();

    const relatedValue = (args.object as any)[propName];

    if (!(relatedValue instanceof Date)) return false;

    return value < relatedValue;
  }

  public defaultMessage(args: ValidationArguments) {
    const [propName] = args.constraints;

    return `${args.property} must be before ${propName} or the current date`;
  }
}

export const IsBefore = (propName: string) =>
  function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      validator: IsBeforeConstraint,
      constraints: [propName],
      name: 'IsBefore',
    });
  };
