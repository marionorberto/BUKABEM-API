import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EnumClasse, EnumCourse } from '../interfaces/interfaces';

export class UpdateProfileDto {
  @IsNotEmpty({ message: 'data de nascimento não pode estar vazia' })
  birthday: Date;

  @MaxLength(1, { message: 'sexo deve ter no maximo 1 caracter' })
  @IsString({ message: 'Pais deve ser uma string' })
  @IsNotEmpty({ message: 'sexo não pode estar nulo' })
  sex: string;

  @IsNotEmpty({ message: 'a imagem não pode estar vazia' })
  imgUrl: string;

  @IsString({ message: 'experiência profissional deve ser uma string' })
  class: EnumClasse;

  @IsString({ message: 'experiência profissional deve ser uma string' })
  @IsNotEmpty({ message: 'experiência profissional não pode estar vazia' })
  personalDescription: string;

  @IsString({ message: 'experiência profissional deve ser uma string' })
  @IsNotEmpty({ message: 'experiência profissional não pode estar vazia' })
  professionalExperience: number;

  @IsNotEmpty({ message: 'curso não pode estar vazia' })
  course: EnumCourse;
}
