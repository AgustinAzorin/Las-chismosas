import { IsEmail } from 'class-validator';

export class SubscribeDto {
  @IsEmail({}, { message: 'Mandanos un mail válido, dale.' })
  email!: string;
}
