import Task from '../../domain/models/Task';

export default abstract class TaskRepositoryInterface {
  abstract async persist(task: Task): Promise<Task>;
}
