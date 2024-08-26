import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from '../../domain/students/controller';
import { StudentService } from '../../domain/students/service';
import { CreateStudentDto } from '../../domain/students/dto/create';
import { UpdateStudentDto } from '../../domain/students/dto/update';
import { Student } from '../../domain/students/entity';
import { UUID } from 'crypto';

const studentList: Student[] = [
  {
    id: '890094be-6c8f-45f1-8e57-1c25b6db99bf' as UUID,
    name: 'Student One',
    email: 'studentone@email.com',
    ra: '123456',
    cpf: '474.638.403-79',
  },
  {
    id: '723d715e-2765-40dc-bdcd-efb95531bbdd' as UUID,
    name: 'Student Two',
    email: 'studenttwo@email.com',
    ra: '654321',
    cpf: '256.400.971-91',
  },
];

const newStudent: Student = {
  id: 'e126e607-35f6-4110-baad-4047f78a59d4' as UUID,
  name: 'New Student',
  email: 'newstudent@email.com',
  ra: '000000',
  cpf: '139.988.810-26',
};

const updatedStudent: Student = {
  id: 'e126e607-35f6-4110-baad-4047f78a59d4' as UUID,
  name: 'Updated Student',
  email: 'newstudent@email.com',
  ra: '000000',
  cpf: '139.988.810-26',
};

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: {
            create: jest.fn().mockResolvedValue(newStudent),
            findAll: jest.fn().mockResolvedValue(studentList),
            findOne: jest.fn().mockResolvedValue(studentList[0]),
            update: jest.fn().mockResolvedValue(updatedStudent),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new student', async () => {
      // Arrange
      const body: CreateStudentDto = {
        name: 'New Student',
        email: 'newstudent@email.com',
        ra: '000000',
        cpf: '139.988.810-26',
      };

      // Act
      const result = await controller.create(body);

      // Assert
      expect(result).toEqual(newStudent);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    it('should return all students', async () => {
      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(studentList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one student by id', async () => {
      // Act
      const result = await controller.findOne(
        '890094be-6c8f-45f1-8e57-1c25b6db99bf' as UUID,
      );

      // Assert
      expect(result).toEqual(studentList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith('890094be-6c8f-45f1-8e57-1c25b6db99bf' as UUID);
    });
  });

  describe('update', () => {
    it('should update an existing student', async () => {
      // Arrange
      const body: UpdateStudentDto = {
        name: 'Updated Student',
      };

      // Act
      const result = await controller.update(
        'e126e607-35f6-4110-baad-4047f78a59d4' as UUID,
        body,
      );

      // Assert
      expect(result).toEqual(updatedStudent);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(
        'e126e607-35f6-4110-baad-4047f78a59d4' as UUID,
        body,
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing student', async () => {
      // Act
      const result = await controller.delete(
        '890094be-6c8f-45f1-8e57-1c25b6db99bf' as UUID,
      );

      // Assert
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(
        '890094be-6c8f-45f1-8e57-1c25b6db99bf' as UUID,
      );
    });
  });
});
