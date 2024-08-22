import { Body, Controller, Post } from "@nestjs/common";
import { StudentService } from "./service";
import { CreateStudentDto } from "./dto/create";

@Controller('students')
export class StudentController{
    constructor(
        private readonly studentService: StudentService
    ){}

    @Post()
    create(@Body() createStudentDto: CreateStudentDto){
        return this.studentService.create(createStudentDto)
    }
}