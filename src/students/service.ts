import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entity';
import { CreateStudentDto} from './dto/create';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = plainToInstance(Student, createStudentDto)
    const result = this.studentRepository.save(newStudent);
    return result
  }

}
