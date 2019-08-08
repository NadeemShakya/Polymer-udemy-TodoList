import { LitElement, html, css} from "lit-element";
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
  static get styles() {
    return [
      css `
        .addItem {
          width: 70%;
          text-align: center;
          display: block;
          margin: 0 auto;

        }
        .addItem input[type = "text"] {
          width: 90%;
          height: 34px;
          padding: 6px 12px;
          background-color: #fff;
          background-image: none;
          border: 1px solid #ccc;
          box-sizing: border-box;
          float: left;
          color: #555;
          outline: none;
          border-radius: 3px 0 0 3px;
          font-size: 14px;
        }

        .addItem button {
          float: right;
          width: 10%;
          height: 34px;
          background: rgba(2,184,117, .8);
          border: none;
          color: #ffffff;
          border-radius: 0 3px 3px 0;

        }

        .addItem button:hover {
          background: rgba(2,184,117, 1);
          opacity: 1;
          transition: .3s;
          cursor: pointer;
        }

        .clearfix::after {
          content: "";
          clear: both;
          display: table;
        }
      `
    ]
  }
  render() {
    return html`
      <div class = "addItem clearfix">
        <input type = "text" .value = "${this.todoItem}" @keyup = "${e =>
          this.handleInputChange(e)}" placeholder = "Add your todo"></input>
        <button @click = "${this.handleAddTodo}" class = "addItemButton">Add</button>
        
      </div>
      
    `;
  }
}

customElements.define("add-item", AddItem);
