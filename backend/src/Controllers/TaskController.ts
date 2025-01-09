import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import TaskRepository from '../Repositories/TaskRepository';
import UseCaseFactory from 'src/UseCase/UseCaseFactory';

@Controller()
export default class TaskController {
  constructor(
    private readonly useCaseFactory: UseCaseFactory,
    private readonly taskRepository: TaskRepository, // Injection directe du repository
  ) {}

  /**
   * Récupère toutes les tâches
   */
  @Get('/tasks')
  async getAll() {
    const getAllTasksUseCase =
      await this.useCaseFactory.create(GetAllTasksUseCase);
    return getAllTasksUseCase.handle();
  }

  /**
   * Crée une nouvelle tâche
   * @param dto - Les données de la tâche à créer
   */
  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    // Utilise directement le repository pour gérer la sauvegarde
    return this.taskRepository.save({ name: dto.name });
  }

  /**
   * Met à jour une tâche existante
   * @param id - L'identifiant de la tâche à mettre à jour
   * @param dto - Les données de la tâche mise à jour
   */
  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    // Utilise directement le repository pour gérer la mise à jour
    return this.taskRepository.save({ id: Number(id), name: dto.name });
  }

  /**
   * Supprime une tâche existante
   * @param id - L'identifiant de la tâche à supprimer
   */
  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    const deleteTaskUseCase = await this.useCaseFactory.create(DeleteTask);
    return deleteTaskUseCase.handle(Number(id));
  }
}
