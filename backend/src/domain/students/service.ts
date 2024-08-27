import { UpdateStudentDto } from './dto/update';
import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entity';
import { CreateStudentDto} from './dto/create';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private repository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> { 
    const existingStudent = await this.findOneByRa(createStudentDto.ra)
    if(existingStudent) throw new ConflictException('Aluno com esse registro acadêmico já existe')
        
    const newStudent = plainToInstance(Student, createStudentDto)
    try{
     const response = await this.repository.save(newStudent);
     return response
    }catch(e){
      throw new HttpException('Erro ao criar o estudante.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByRa(ra:string): Promise<Student> | null{
    return this.repository.findOne({
      where:{ra:ra}
    })
  }

  async findAll(): Promise<Student[]> | null {
    return this.repository.find();
  }

  async findOne(id:UUID): Promise<Student> | null {
    const response = await this.repository.findOne({
      where:{id}
    });
    console.log(response)
  if(!response) throw new NotFoundException(`Aluno com ${id} não encontrado`)
    return response
  }

  async update(id:UUID, updateStudentDto:UpdateStudentDto) {
    const student = await this.findOne(id)
    if(!student) throw new NotFoundException(`Aluno com o ${id} não encontrado`)  
    return this.repository.update(id, updateStudentDto)
  }

  async remove(id: UUID):Promise<void>{
    const result = await this.repository.delete(id)
    if(result.affected === 0) throw new NotFoundException(`Aluno com o ${id} não encontrado`)
  }

}
