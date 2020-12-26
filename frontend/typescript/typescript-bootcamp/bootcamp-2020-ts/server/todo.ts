import express from 'express';
const router = express.Router();
const todoList: Todo[] = [];

class Todo {
  id: number;
  name: string;
  done: boolean;

  constructor(id: number, name: string, done: boolean) {
    this.id = id;
    this.name = name;
    this.done = done;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      done: this.done
    };
  }

  getId() {
    return this.id;
  }
}

router.post("/", (req: express.Request, res: express.Response, next) => {
  const id = todoList.length ? todoList[todoList.length - 1].getId() + 1 : 0;
  const item = new Todo(id, req.body.name, false);
  todoList.push(item);
  return res.status(201).send(item);
});

router.get("/", (req, res, next) => {
  return res.send({ todoList: todoList });
});

router.patch("/:id", (req, res, next) => {
  const id: number = parseInt(req.params.id);
  const { name, done } = req.body;
  const todo = todoList.find(todo => todo.id == id);
  // undefined の可能性もあるので緩い比較にしている
  if (todo == null) {
    return res.status(400)
  }
  todo.name = name;
  todo.done = done;
  return res.status(201).send(todo);
});

router.delete("/:id", (req, res, next) => {
  const id: number = parseInt(req.params.id);
  const index = todoList.findIndex(todo => todo.id == id);
  todoList.splice(index, 1);
  return res.status(204).send("done");
});

export default router;
