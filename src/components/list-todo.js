import { LitElement, html } from "lit-element";
import "./todo-item";
class ListTodo extends LitElement {
  static get properties() {
    return {
      todo: Array,
      user: String,
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <ul>
        ${this.todo.map(
          (value, index) =>
            html`
              <li><todo-item .todoItem="${value}"></todo-item></li>
            `
        )}
      </ul>
    `;
  }
}

customElements.define("list-todo", ListTodo);
