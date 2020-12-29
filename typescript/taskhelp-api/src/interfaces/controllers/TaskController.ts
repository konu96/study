import TaskSerializer from '../serializers/TaskSerializer'
import TaskRepository from '../database/TaskRepository'
import CreateTask from '../../application/usecases/CreateTask'
import DBConnectionInterface from '../database/DBConnectionInterface'

export default class TaskController {
  private taskSerializer: TaskSerializer;
  private taskRepository: TaskRepository;

  constructor(dbConnection: DBConnectionInterface) {
    this.taskSerializer = new TaskSerializer();
    this.taskRepository = new TaskRepository(dbConnection);
  }

  async createTask(request: any, response: any) {
    const { title, description } = request.body;
    const useCase = new CreateTask(this.taskRepository);
    const result = await useCase.execute(title, description);

    return this.taskSerializer.serialize(result);
  }

}
