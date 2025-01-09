import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService'; // Assurez-vous que PrismaService est correctement importé
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Récupère toutes les tâches
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  // Supprime une tâche par son ID
  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  // Sauvegarde ou met à jour une tâche
  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ): Promise<Task> {
    if (!('id' in data) || !data.id) {
      // Création d'une nouvelle tâche
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput,
      });
    }

    // Mise à jour d'une tâche existante
    return this.prisma.task.update({
      where: {
        id: data.id as number,
      },
      data: data as Prisma.TaskUpdateInput,
    });
  }
}
