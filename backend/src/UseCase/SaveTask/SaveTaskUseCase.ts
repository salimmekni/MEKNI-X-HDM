import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  /**
   * Gère la sauvegarde ou la mise à jour d'une tâche.
   * @param dto - Les données de la tâche
   * @returns {Promise<Task>} La tâche créée ou mise à jour
   */
  async handle(dto: SaveTaskDto): Promise<Task> {
    // Étape 1 : Validation des données reçues
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException(
        'Le nom de la tâche ne peut pas être vide.',
      );
    }

    // Étape 2 : Vérifie si la tâche existe avant de la mettre à jour
    if (dto.id) {
      const existingTask = await this.taskRepository
        .findAll()
        .then((tasks) => tasks.find((task) => task.id === dto.id));
      if (!existingTask) {
        throw new NotFoundException(
          `La tâche avec l'ID ${dto.id} n'existe pas.`,
        );
      }
    }

    // Étape 3 : Création ou mise à jour de la tâche
    try {
      return await this.taskRepository.save({
        id: dto.id ?? undefined,
        name: dto.name,
      });
    } catch (error) {
      throw new Error(
        'Une erreur est survenue lors de la sauvegarde de la tâche.',
      );
    }
  }
}
