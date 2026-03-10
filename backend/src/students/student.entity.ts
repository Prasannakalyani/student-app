import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('students')
export class Student {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Arjun Mehta' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 'arjun@university.edu' })
  @Column({ unique: true, length: 150 })
  email: string;

  @ApiProperty({ example: 21 })
  @Column()
  age: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
