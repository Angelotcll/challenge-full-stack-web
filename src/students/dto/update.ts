import { IsEmail, IsString, Length, Matches } from "@nestjs/class-validator";

export class UpdateStudentDto{

    @IsString()
    @Length(5, 120)
    @Matches(/^[a-zA-Z]+ [a-zA-Z]/, { message: 'Informe nome e sobrenome' })
    name?:string;

    @IsString()
    @IsEmail()
    email?:string;

}