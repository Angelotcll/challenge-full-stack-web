import MockAdapter from 'axios-mock-adapter';
import { api } from '../../lib/api';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudentById,
} from '../../services/students';

const studentList = [
  {
    id: '890094be-6c8f-45f1-8e57-1c25b6db99bf',
    name: 'Student One',
    email: 'studentone@email.com',
    ra: '123456',
    cpf: '474.638.403-79',
  },
  {
    id: '723d715e-2765-40dc-bdcd-efb95531bbdd',
    name: 'Student Two',
    email: 'studenttwo@email.com',
    ra: '654321',
    cpf: '256.400.971-91',
  },
];

const newStudent = {
  id: 'e126e607-35f6-4110-baad-4047f78a59d4',
  name: 'New Student',
  email: 'newstudent@email.com',
  ra: '000000',
  cpf: '139.988.810-26',
};

const updatedStudent = {
  id: 'e126e607-35f6-4110-baad-4047f78a59d4',
  name: 'Updated Student',
  email: 'updatedstudent@email.com',
  ra: '000000',
  cpf: '139.988.810-26',
};

const mock = new MockAdapter(api);

describe('Student Service', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('createStudent', () => {
    it('should create a student successfully', async () => {
      mock.onPost('/students').reply(200, newStudent);

      const response = await createStudent(newStudent);

      // Acesso à propriedade data da resposta
      expect(response.data).toEqual(newStudent);
    });

    it('should throw a 409 error when a conflict occurs', async () => {
      const errorMessage = 'Conflict occurred';
      mock.onPost('/students').reply(409, { message: errorMessage });

      await expect(createStudent(newStudent)).rejects.toThrow(new Error(errorMessage));
    });

    it('should throw a generic error for unknown errors', async () => {
      mock.onPost('/students').reply(500);

      await expect(createStudent(newStudent)).rejects.toThrow('Erro desconhecido ao criar o estudante.');
    });
  });

  describe('getAllStudents', () => {
    it('should return a list of students', async () => {
      mock.onGet('/students/all').reply(200, studentList);

      const response = await getAllStudents();

      expect(response.data).toEqual(studentList);
    });
  });

  describe('getStudentById', () => {
    it('should return a student by ID', async () => {
      const studentId = '890094be-6c8f-45f1-8e57-1c25b6db99bf';
      const student = studentList.find(s => s.id === studentId);

      mock.onGet(`/students/${studentId}`).reply(200, student);

      const response = await getStudentById(studentId);

      expect(response.data).toEqual(student);
    });
  });

  describe('updateStudent', () => {
    it('should update a student successfully', async () => {
      const studentId = updatedStudent.id;
      mock.onPatch(`/students/${studentId}`).reply(200, updatedStudent);

      const response = await updateStudent(studentId, updatedStudent);

      expect(response.data).toEqual(updatedStudent);
    });
  });

  describe('deleteStudentById', () => {
    it('should delete a student by ID', async () => {
      const studentId = '890094be-6c8f-45f1-8e57-1c25b6db99bf';
      mock.onDelete(`/students/${studentId}`).reply(200);

      await expect(deleteStudentById(studentId)).resolves.not.toThrow();
    });
  });
});
