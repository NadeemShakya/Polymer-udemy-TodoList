import { LitElement, html, css } from "lit-element";
import "./add-item";
import "./list-todo";
import "lodash";

class TodoApp extends LitElement {
  static get styles() {
    return [
      css`
        :host([hidden]) {
          display: none;
        }
        :host {
          display: inline-block;
          background: #ffffff;
          width: 80%;
        }
        h1 {
          text-align: center;
          color: #02b875;
        }
      `
    ];
  }
  static get properties() {
    return {
      todoList: Array
    };
  }
  constructor() {
    super();
    this.todoList = JSON.parse(localStorage.getItem("todo-list"));
    this.todoList === null ? (this.todoList = []) : this.todoList;
  }

  firstUpdated() {
    this.addEventListener("updateTodo", e => {
      this.todoList = e.detail.storedItems;
    });

    this.addEventListener("deleteItem", e => {
      let todo = this.todoList.find(todo => {
        return todo.id === e.detail.id;
      });
      this.todoList.splice(this.todoList.indexOf(todo), 1);
      localStorage.setItem("todo-list", JSON.stringify(this.todoList));
      this.todoList = _.clone(this.todoList);
    });

    this.addEventListener("completeTodoItem", e => {
      let todo = this.todoList.find(todo => {
        return todo.id === e.detail.id;
      });
      let todoIndex = this.todoList.indexOf(todo);
      this.todoList[todoIndex].completed = !this.todoList[todoIndex].completed;
      localStorage.setItem("todo-list", JSON.stringify(this.todoList));
    });
  }
  render() {
    return html`
      <div class="todoApp">
        <h1>My Todo List</h1>
        <add-item> </add-item>
        <list-todo .todo="${this.todoList}"></list-todo>
      </div>
    `;
  }
}

customElements.define("todo-app", TodoApp);
