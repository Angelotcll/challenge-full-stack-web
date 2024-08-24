import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { StudentService } from "./service";
import { CreateStudentDto } from "./dto/create";
import { UUID } from "crypto";
import { UpdateStudentDto } from "./dto/update";

@Controller('students')
export class StudentController{
    constructor(
        private readonly studentService: StudentService
    ){}

    @Post()
    create(@Body() createStudentDto: CreateStudentDto){
        return this.studentService.create(createStudentDto)
    }

    @Get('/all')
    findAll(){
        return this.studentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: UUID){
        return this.studentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id:UUID, @Body() updateStudentDto: UpdateStudentDto){
        return this.studentService.update(id, updateStudentDto)
    }

    @Delete(':id')
    delete(@Param('id') id: UUID){
       return this.studentService.remove(id)
    }
}