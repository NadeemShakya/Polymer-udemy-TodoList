import { LitElement, html, css } from "lit-element";
import "@polymer/paper-checkbox/paper-checkbox.js";

class TodoItem extends LitElement {
  static get properties() {
    return {
      todoItem: Object
    };
  }

  static get styles() {
    return css`
      .todo {
        font-size: 14px;
        position: relative;
      }

      li {
        margin: 0 auto;
        width: 70%;
        display: list-item;
        text-align: -webkit-match-parent;
      }

      .toggle {
        cursor: pointer;
        position: absolute;
        top: 12px;
        left: 0px;
        text-align: center;
        width: 20px;
        height: 20px;
        margin: auto;
        border: none;
      }

      li label {
        white-space: pre-line;
        word-break: break-all;
        padding: 15px 80px 15px 0px;
        margin-left: 35px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
        cursor: pointer;
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
        text-decoration-color: #02b875;
        color: #02b875;
      }

      .inactive {
        color: #800000;
      }

      li .destroy {
        outline: none;
        display: none;
        cursor: pointer;
        position: absolute;
        top: -8px;
        right: 0px;
        width: 40px;
        height: 48px;
        margin: auto 0;
        font-size: 50px;
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
      <custom-style>
      <style is="custom-style">
      paper-checkbox.green {
  
        --paper-checkbox-checked-color: var(--paper-green-500);
        --paper-checkbox-checked-ink-color: var(--paper-green-500);
        --paper-checkbox-unchecked-color: var(--paper-green-900);
        --paper-checkbox-unchecked-ink-color: var(--paper-green-900);
        --paper-checkbox-label-color: var(--paper-green-700);
      }
      </style>
      </custom-style>
        <li>
          <div class="todo">
            <div class="view">
              <paper-checkbox
                class="toggle green"
                .checked="${this.todoItem.completed}"
                @click="${() => this.completeTodo(this.todoItem.id)}"
              >
              </paper-checkbox>
              <label class="${this.todoItem.completed ? "active" : "inactive"}"
                >${this.todoItem.task}</label
              >
              <button class="destroy" @click="${this.dropTodoItem}"></button>
            </div>
          </div>
        </li>
      </custom-style>
    `;
  }
}
customElements.define("todo-item", TodoItem);
