import { UpdateStudentDto } from './dto/update';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
     return this.repository.save(newStudent);
    }catch(e){
      console.error(e) // tratar erros do typeorm
    }
  }

  async findOneByRa(ra:number): Promise<Student> | null{
    return this.repository.findOne({
      where:{ra:ra}
    })
  }

  async findAll(): Promise<Student[]> | null {
    return this.repository.find();
  }

  async findOne(id:UUID): Promise<Student> | null {
    return this.repository.findOne({
      where:{id}
    });
  }

  async update(id:UUID, updateStudentDto:UpdateStudentDto) {
    const student = await this.findOne(id)
    if(!student) throw new NotFoundException(`Aluno com o ${id} não encontrado`)
     
      const updateStudent = plainToInstance(Student, UpdateStudentDto)
    return this.repository.update(id, updateStudent)
  }

  async remove(id: UUID):Promise<void>{
    const result = await this.repository.delete(id)
    if(result.affected === 0) throw new NotFoundException(`Aluno com o ${id} não encontrado`)
  }

}
