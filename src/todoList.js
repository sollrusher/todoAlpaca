import { React } from "react";
import { Component } from "react";
import "./todoList.css";
import TodoItem from "./todo-item";
import api from "./utils/api";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCard: "",
    };
  }
  async componentDidMount() {
    try {
      let cards = await api.get("/allcards");
      if (!cards) throw new Error("Todo list is empty");
      console.log(cards.data.cards);

      this.setState({
        ...this.state,
        ...{
          cards: cards.data.cards,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (event) => {
    this.setState({ newCard: event.target.value });
  };

  handleSubmit = async (event) => {
    if (event.key == "Enter" && this.state.newCard !== "") {
      console.log("enter press here! ");
      const newTodo = await api.post("/newcard", { title: this.state.newCard });
      if (this.state.cards) {
        const oldArr = this.state.cards;

        oldArr.push(newTodo.data.cards);
        
        this.setState({
          ...this.state,
          ...{
            cards: oldArr,
          },
        });
        this.setState({
          newCard: ''
        })
      }
    }
  };

  onDelete = (id) => {
    const newArr = this.state.cards.filter(item=>{
      if(item.id !== id)
      return item
    });
    this.setState({
      ...this.state,
      ...{
        cards: newArr,
      },
    });

    api.delete("/deletecard", { data: {id: id} });
  }

  onToggle = (id) => {
    const newArr = this.state.cards.filter(item=>{
      if(item.id == id)
      {
        item.done = !item.done
      }
      return item
    });
    this.setState({
      ...this.state,
      ...{
        cards: newArr,
      },
    });

    api.put("/toggledone", { id });
  }

  render() {
    const name = "Данила";
    console.log("gagagagagag - ", this.state);
    let todos;
    if (this.state.cards) {
      todos = this.state.cards.map((element) => {
        return (
          <TodoItem
            id={element.id}
            title={element.title}
            done={element.done}
            createdAt={element.createdAt}
            onDelete={() => this.onDelete(element.id)}
            onToggle={() => this.onToggle(element.id)}
          />
        );
      });
    }

    console.log(todos);
    return (
      <section className="main">
        <section className="main__head">
          <h1>Здравствуйте, {name}</h1>
          <input
            name="newCard"
            className="newItem"
            type="textarea"
            placeholder="Новое дело ?"
            value={this.state.newCard}
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
          />
          <h2>Ваши запланированые дела: </h2>
        </section>

        <section className="main__list">
          <ul>{todos}</ul>
        </section>
      </section>
    );
  }
}
