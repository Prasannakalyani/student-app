import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  async findAll(search?: string): Promise<Student[]> {
    if (!search) return this.repo.find({ order: { id: 'ASC' } });

    return this.repo.find({
      where: [
        { name: ILike(`%${search}%`) },
        { email: ILike(`%${search}%`) },
      ],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.repo.findOne({ where: { id } });
    if (!student) throw new NotFoundException(`Student #${id} not found`);
    return student;
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already in use');
    const student = this.repo.create(dto);
    return this.repo.save(student);
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    if (dto.email && dto.email !== student.email) {
      const exists = await this.repo.findOne({ where: { email: dto.email } });
      if (exists) throw new ConflictException('Email already in use');
    }
    Object.assign(student, dto);
    return this.repo.save(student);
  }

  async remove(id: number): Promise<{ message: string }> {
    const student = await this.findOne(id);
    await this.repo.remove(student);
    return { message: `Student #${id} deleted successfully` };
  }
}
