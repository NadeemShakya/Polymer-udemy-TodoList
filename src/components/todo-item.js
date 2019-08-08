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
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <div class = "container-fluid">
        <span>${checkbox}</span>
        <span>${this.todoItem.task}</span>
        <iron-icon icon="delete" @click="${this.dropTodoItem}"></iron-icon>
      </div>
      
    `;
  }
}
customElements.define("todo-item", TodoItem);
