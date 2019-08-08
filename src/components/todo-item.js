import { LitElement, html } from "lit-element";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";
class TodoItem extends LitElement {
  
  static get properties() {
    return {
      todoItem: Object,
    };
  }

  constructor() {
    super();
    this.todoItem = {};
  }

  dropTodoItem() {
    this.dispatchEvent(
      new CustomEvent("deleteItem", {
        detail: {
          id: this.todoItem.id,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
  completeTodo(e) {
    console.log(e.target);
    this.dispatchEvent(
      new CustomEvent("completeTodoItem", {
        detail: {
          id: this.todoItem.id,
          input: e.target,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    let checkbox = this.todoItem.completed
      ? html`
          <input
            type="checkbox"
            @click="${e => this.completeTodo(e)}"
            id="${this.todoItem.id}"
            checked
          />
        `
      : html`
          <input
            type="checkbox"
            @click="${e => this.completeTodo(e)}"
            id="${this.todoItem.id}"
          />
        `;
    return html`
     <div class = "container-fluid">
        <span>${checkbox}</span>
        <span>${this.todoItem.task}</span>
        <iron-icon icon="delete" @click="${this.dropTodoItem}"></iron-icon>
      </div>
      
    `;
  }
}
customElements.define("todo-item", TodoItem);
