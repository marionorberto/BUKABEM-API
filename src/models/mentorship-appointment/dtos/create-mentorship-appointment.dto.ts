import { IsNotEmpty, IsString } from 'class-validator';
import { EnumMentorshipType } from '../interfaces/interface';
// import { TagMentorship } from 'src/database/entities/tag-mentorship/tag-mentorship.entity';

export class CreateMentorshipAppointment {
  @IsString({ message: 'tipo de mentoria deve ser uma string' })
  @IsNotEmpty({ message: 'tipo de mentoria não pode estar vazia' })
  type: EnumMentorshipType;

  @IsString({ message: 'mensagem deve ser uma string' })
  @IsNotEmpty({ message: 'mensagem não pode estar vazia' })
  message: string;

  @IsNotEmpty({ message: 'tags não pode estar vazia' })
  tags: { description: string }[];
}
