import moment from 'moment-timezone'
import Task from '../../domain/models/Task'
import ITaskRepository from '../../application/repositories/TaskRepositoryInterface'
import IDBConnection from './DBConnectionInterface'

export default class TaskRepository extends TaskRepositoryInterface {
  private connection: any;

  constructor(connection: DBConnectionInterface) {
    super();
    this.connection = connection;
  }

  async persist(task: Task): Promise<Task> {
    const result = await this,connection.execute(
      'INSERT INTO tasks (title, description, created_at, updated_at) VALUES (?, ?, ?, ?)',
      [
        task.title,
        task.description,
        task.getUTCCreatedAt(),
        task.getUTCUpdatedAt(),
      ]
      );
      task.id = result.inserId;

      return task;
  }
}
