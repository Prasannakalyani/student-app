import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt, Min, Max, MinLength, MaxLength } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Arjun Mehta', description: 'Full name of the student' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'arjun@university.edu', description: 'Email address (must be unique)' })
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({ example: 21, description: 'Age between 5 and 100' })
  @IsInt()
  @Min(5)
  @Max(100)
  age: number;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
