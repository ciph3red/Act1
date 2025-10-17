import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty({ description: 'The unique identifier of the task' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the task', maxLength: 255 })
  @Column({ length: 255 })
  title: string;

  @ApiProperty({ description: 'The detailed description of the task', nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Whether the task is completed', default: false })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ description: 'The priority level of the task', nullable: true })
  @Column({ nullable: true })
  priority: string;

  @ApiProperty({ description: 'The due date of the task', nullable: true })
  @Column({ type: 'datetime', nullable: true })
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
