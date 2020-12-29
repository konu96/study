import store from "../store.js";
import { createAddTodoAction } from "../flux/index.js";

class TodoForm {
  private readonly button: HTMLInputElement | null
  private readonly form: HTMLInputElement | null

  constructor() {
    this.button = document.querySelector(".todo-form__submit");
    this.form = document.querySelector(".todo-form__input");
  }

  mount() {
    this.button?.addEventListener("click", e => {
      e.preventDefault();
      if (this.form !== null && 'value' in this.form) {
        store.dispatch(createAddTodoAction({name: this.form.value}));
        this.form.value = "";
      }
    });
  }
}

export default TodoForm;
