import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from '@nestjs/class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @Length(5, 120)
  @Matches(/^[a-zA-Z]+ [a-zA-Z]/, { message: 'Informe nome e sobrenome' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}
