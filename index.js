import { LitElement, html } from "lit-element";

class TodoApp extends LitElement {
  static get properties() {
    return {
      todos: Array
    }
  }

  constructor() {
    super();
    this.todos = [];
  }

  render() {
    return html `
      <h1>Todo App</h1>
    `
  }
}

customElements.define('todo-app', TodoApp);