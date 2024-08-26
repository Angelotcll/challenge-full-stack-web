import { StudentService } from '../../domain/students/service';
import { Repository } from 'typeorm';
import { Student } from '../../domain/students/entity';
import { CreateStudentDto } from '../../domain/students/dto/create';
import { UpdateStudentDto } from '../../domain/students/dto/update';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { describe } from 'node:test';
import { UUID } from 'crypto';

function createStudentService() {
    const repository: any = {};
  
    const service = new StudentService(repository);
  
    return {
      repository: repository as Repository<Student>,
      service,
    };
  }
  
  function baseCreateStudentDto(): CreateStudentDto {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      ra: '123456789',
      cpf: '123.456.789-00',
    };
  }
  
  function baseUpdateStudentDto(): UpdateStudentDto {
    return {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    };
  }
  
  describe('StudentService CRUD tests', () => {
    describe('basic tests', () => {
      it('should instantiate service', () => {
        const { service } = createStudentService();
        expect(service).toBeTruthy();
      });
    });
  
    describe('create successful tests', () => {
      it('should create a student with all dto defined', async () => {
        const { service, repository } = createStudentService();
        const dto = baseCreateStudentDto();
  
        repository.save = jest.fn().mockResolvedValue({ id: '1', ...dto });
        service.findOneByRa = jest.fn().mockResolvedValue(null);
  
        const result = await service.create(dto);
  
        expect(result).toEqual({ id: '1', ...dto });
        expect(repository.save).toHaveBeenCalledTimes(1);
        expect(service.findOneByRa).toHaveBeenCalledTimes(1);
        expect(service.findOneByRa).toHaveBeenCalledWith(dto.ra);
      });
  
      it('should throw ConflictException if student with same RA already exists', async () => {
        const { service, repository } = createStudentService();
        const dto = baseCreateStudentDto();
  
        service.findOneByRa = jest.fn().mockResolvedValue({ id: '1', ...dto });
  
        try {
          await service.create(dto);
          throw 'should not get here';
        } catch (e) {
          expect(e).toBeInstanceOf(ConflictException);
        }
  
        expect(service.findOneByRa).toHaveBeenCalledTimes(1);
        expect(service.findOneByRa).toHaveBeenCalledWith(dto.ra);
      });
    });
  
    describe('findOne successful tests', () => {
      it('should find one student by ID if repository returns it', async () => {
        const { service, repository } = createStudentService();
        const id = '1' as UUID;
  
        repository.findOne = jest.fn().mockResolvedValue({ id });
  
        const result = await service.findOne(id);
  
        expect(result).toEqual({ id });
        expect(repository.findOne).toHaveBeenCalledTimes(1);
        expect(repository.findOne).toHaveBeenCalledWith({
          where: { id },
        });
      });
    });
  
    describe('findOne fail tests', () => {
      it('should throw NotFoundException if repository returns null', async () => {
        const { service, repository } = createStudentService();
        const id = '1' as UUID;
  
        repository.findOne = jest.fn().mockResolvedValue(null);
  
        try {
          await service.findOne(id);
          throw 'should not get here';
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
        }
  
        expect(repository.findOne).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('findAll successful tests', () => {
      it('should get all students', async () => {
        const { service, repository } = createStudentService();
        
        repository.find = jest.fn().mockResolvedValue([{ id: '1' }, { id: '2' }]);
  
        const result = await service.findAll();
  
        expect(result).toEqual([{ id: '1' }, { id: '2' }]);
        expect(repository.find).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('update successful tests', () => {
      it('should update student if exists', async () => {
        const { service, repository } = createStudentService();
        const id = '1' as UUID;
        const updateDto: UpdateStudentDto = baseUpdateStudentDto();
  
        service.findOne = jest.fn().mockResolvedValue({ id });
        repository.update = jest.fn().mockResolvedValue({ affected: 1 });
  
        await service.update(id, updateDto);
  
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledWith(id, updateDto);
      });
  
      it('should not update if only partial DTO is provided', async () => {
        const { service, repository } = createStudentService();
        const id = '1' as UUID;
        const updateDto: UpdateStudentDto = { name: 'Updated Name' };
  
        service.findOne = jest.fn().mockResolvedValue({ id });
        repository.update = jest.fn().mockResolvedValue({ affected: 1 });
  
        await service.update(id, updateDto);
  
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledWith(id, updateDto);
      });
    });
  
    describe('update fail tests', () => {
      it('should throw NotFoundException if student to update does not exist', async () => {
        const { service, repository } = createStudentService();
        const id = '1' as UUID;
        const updateDto: UpdateStudentDto = baseUpdateStudentDto();
  
        service.findOne = jest.fn().mockResolvedValue(null);
  
        try {
          await service.update(id, updateDto);
          throw 'should not get here';
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
        }
  
        expect(service.findOne).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('remove successful tests', () => {
      it('should remove if repository returns > 0 rows affected', async () => {
        const { service, repository } = createStudentService();
        const id = '1' as UUID;
  
        repository.delete = jest.fn().mockResolvedValue({ affected: 1 });
  
        await service.remove(id);
  
        expect(repository.delete).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(id);
      });
    });
  
    describe('remove fail tests', () => {
      it('should throw NotFoundException if no rows were affected', async () => {
        const { service, repository } = createStudentService();
        const id = '1' as UUID;
  
        repository.delete = jest.fn().mockResolvedValue({ affected: 0 });
  
        try {
          await service.remove(id);
          throw 'should not get here';
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
        }
  
        expect(repository.delete).toHaveBeenCalledTimes(1);
      });
    });
  });