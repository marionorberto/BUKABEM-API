import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EnumClasse, EnumCourse } from '../interfaces/interfaces';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'data de nascimento não pode estar vazia' })
  birthday: Date;

  @MaxLength(1, { message: 'sexo deve ter no maximo 1 caracter' })
  @IsString({ message: 'Pais deve ser uma string' })
  @IsNotEmpty({ message: 'sexo não pode estar nulo' })
  sex: string;

  @MinLength(6, { message: 'o nome da imagem é curto' })
  @IsString({ message: 'a imagem deve ser um string' })
  @IsNotEmpty({ message: 'a imagem não pode estar vazia' })
  imgUrl: string;

  @IsNotEmpty({ message: 'class não pode estar vazia!' })
  classe: EnumClasse;

  @IsString({ message: 'Informações pessoais devem ser uma string!' })
  @IsNotEmpty({ message: 'Informações pessoais não podem estar vazia!' })
  personalDescription: string;

  @IsNotEmpty({ message: 'experiência profissional não pode estar vazia' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Experiências profissionais deve ser um number!' },
  )
  professionalExperience: number;

  @IsNotEmpty({ message: 'curso não pode estar vazia' })
  course: EnumCourse;
}
