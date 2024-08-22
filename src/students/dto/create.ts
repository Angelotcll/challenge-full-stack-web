import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "@nestjs/class-validator";

export class CreateStudentDto{
    @IsNotEmpty()
    @IsString()
    @Length(5, 120)
    @Matches(/^[a-zA-Z]+ [a-zA-Z]/, { message: 'Informe nome e sobrenome' })
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    ra:string;

    @IsNotEmpty()
    @IsString()
    @Matches(
        '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})',
      )
    cpf:string;
}