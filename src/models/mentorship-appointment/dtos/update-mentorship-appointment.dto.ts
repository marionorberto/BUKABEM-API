import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EnumMentorshipType } from '../interfaces/interface';

export class UpdateMentorshipAppointment {
  @IsString({ message: 'tipo de mentoria deve ser uma string' })
  @IsNotEmpty({ message: 'tipo de mentoria não pode estar vazia' })
  @IsOptional()
  type: EnumMentorshipType;
}
