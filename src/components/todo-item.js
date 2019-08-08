import { LitElement, html, css } from "lit-element";
class TodoItem extends LitElement {
  static get properties() {
    return {
      todoItem: Object
    };
  }

  static get styles() {
    return css`
      .todo {
        font-size: 24px;
        position: relative;
      }

      li {
        display: list-item;
        text-align: -webkit-match-parent;
      }

      .toggle {
        cursor: pointer;
        position: absolute;
        top: 12px;
        left: 15px;
        text-align: center;
        width: 30px;
        height: 30px;
        margin: auto;
        border: none;
      }

      li label {
        white-space: pre-line;
        word-break: break-all;
        padding: 15px 80px 15px 35px;
        margin-left: 35px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
      }

      button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
      }

      .active {
        text-decoration: line-through;
      }

      li .destroy {
        cursor: pointer;
        position: absolute;
        top: -14px;
        right: 30px;
        display: block;
        width: 40px;
        height: 48px;
        margin: auto 0;
        font-size: 70px;
        color: #cc9a9a;
        margin-bottom: 0px;
        transition: color 0.2s ease-out;
      }

      li .destroy:hover {
        color: #af5b5e;
      }

      li .destroy:after {
        content: "×";
      }

      li:hover .destroy {
        display: inline-block;
      }
    `;
  }

  constructor() {
    super();
    this.todoItem = {};
  }

  dropTodoItem() {
    this.dispatchEvent(
      new CustomEvent("deleteItem", {
        detail: {
          id: this.todoItem.id
        },
        bubbles: true,
        composed: true
      })
    );
  }
  completeTodo(e) {
    console.log(e.target);
    this.dispatchEvent(
      new CustomEvent("completeTodoItem", {
        detail: {
          id: this.todoItem.id,
          input: e.target
        },
        bubbles: true,
        composed: true
      })
    );
    this.requestUpdate();
  }

  render() {
    return html`
      <li>
        <div class="todo">
          <div class="view">
            <input
              type="checkbox"
              class="toggle"
              .checked="${this.todoItem.completed}"
              @click="${() => this.completeTodo(this.todoItem.id)}"
            />
            <label class="${this.todoItem.completed ? "active" : "inactive"}"
              >${this.todoItem.task}</label
            >
            <button class="destroy" @click="${this.dropTodoItem}"></button>
          </div>
        </div>
      </li>
    `;
  }
}
customElements.define("todo-item", TodoItem);
