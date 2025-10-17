import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task', example: 'Complete project documentation' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The detailed description of the task', required: false, example: 'Write comprehensive documentation for the API endpoints' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Whether the task is completed', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiProperty({ description: 'The priority level of the task', required: false, example: 'HIGH' })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiProperty({ description: 'The due date of the task', required: false })
  @IsOptional()
  dueDate?: string;
}
