import { IsNotEmpty, IsString } from 'class-validator';
import { EnumMentorshipType } from '../interfaces/interface';

export class CreateMentorshipAppointment {
  @IsString({ message: 'tipo de mentoria deve ser uma string' })
  @IsNotEmpty({ message: 'tipo de mentoria não pode estar vazia' })
  type: EnumMentorshipType;

  @IsString({ message: 'message deve ser uma string' })
  @IsNotEmpty({ message: 'message não pode estar vazia' })
  message: string;
}
