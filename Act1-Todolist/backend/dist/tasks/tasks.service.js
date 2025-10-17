"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create(createTaskDto) {
        const task = this.tasksRepository.create({
            ...createTaskDto,
            dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
        });
        return await this.tasksRepository.save(task);
    }
    async findAll() {
        return await this.tasksRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        const task = await this.findOne(id);
        const updatedTask = {
            ...task,
            ...updateTaskDto,
            dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : task.dueDate,
        };
        await this.tasksRepository.update(id, updatedTask);
        return await this.findOne(id);
    }
    async remove(id) {
        const task = await this.findOne(id);
        await this.tasksRepository.remove(task);
    }
    async toggleComplete(id) {
        const task = await this.findOne(id);
        task.completed = !task.completed;
        return await this.tasksRepository.save(task);
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map