import { LitElement, html } from "lit-element";
let i = 0;
class AddItem extends LitElement {
  static get properties() {
    return {
      todoItem: String,
      todoList: Object,
    };
  }
  constructor() {
    super();
    this.todoItem = "";
  }

  handleInputChange(e) {
    if (e.keyCode == 13) {
      this.handleAddTodo();
    } else {
      this.todoItem = e.target.value;
    }
  }

  handleAddTodo() {
    if (this.todoItem.length === 0) {
      return console.log("Empty");
    }
    let storedItems = JSON.parse(localStorage.getItem("todo-list"));
    storedItems === null ? (storedItems = []) : storedItems;

    this.todoList = {
      id: new Date().valueOf(),
      completed: false,
      task: this.todoItem,
    };

    storedItems.push(this.todoList);
    localStorage.setItem("todo-list", JSON.stringify(storedItems));
    this.dispatchEvent(
      new CustomEvent("updateTodo", {
        detail: {
          storedItems: JSON.parse(localStorage.getItem("todo-list")),
        },
        bubbles: true,
        composed: true,
      })
    );
    this.todoItem = "";
  }
  render() {
    return html`
      <div>
        <input .value = "${this.todoItem}" @keyup = "${e =>
      this.handleInputChange(e)}"></input>
        
        <button @click = "${this.handleAddTodo}">Add</button>
        
      </div>
      
    `;
  }
}

customElements.define("add-item", AddItem);
