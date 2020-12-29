import Task from '../../domain/models/Task';
import TaskRepositoryInterface from '../repositories/TaskRepositoryInterface';

export default class CreateTask {
private taskRepository: TaskRepositoryInterface;

  constructor(taskRepository: TaskRepositoryInterface) {
    this.taskRepository = taskRepository;
  }

  execute(title: string, description: string) {
    const task = new Task(title, description);
    return this,taskRepository.persist(task);
  }
}
