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
      edittable: false,
      editId: '',
      editCard: '',
      filter: 'all',
      chrono: false,
    };
  }
  async componentDidMount() {
    try {
      let cards = await api.get("/", {params: {filter: this.state.filter, chrono: this.state.chrono}});
      if (!cards) throw new Error("Todo list is empty");
      console.log(cards);

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
    const name = event.target.name;
    if(this.state[name].length < 25) 
    this.setState({ [name]: event.target.value });
    else return
  };

  handleSubmit = async (event) => {
    if (event.key == "Enter" && this.state.newCard !== "") {
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

    api.delete("/", { params: {id: id} });
  }

  onToggleDone = (id) => {
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

    api.put("/", { id });
  }

  toggleEdit=(id, title)=>{
    this.setState({edittable: !this.state.edittable})
    this.setState({editId: id})
    this.setState({editCard: title})
  }

  handleEditSubmit = async (event) => {
    if (event.key == "Enter" && this.state.editCard !== "") {
      const value = this.state.editCard
      const id = this.state.editId
      await api.put("/", {id, title: value})
      this.setState({edittable: !this.state.edittable})

      try {  //not the best solution
        let cards = await api.get("/", {params: {filter: this.state.filter, chrono: this.state.chrono}});
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
  }

  toggleFilter = async (event) => {
    const value = event.target.value;
    console.log(value)

        this.setState({filter: value})

    try {  //not the best solution
      let cards = await api.get("/", {params: {filter: value, chrono: this.state.chrono}});
      if (!cards) throw new Error("Todo list is empty");
      console.log(cards.data.cards);

      this.setState({
        ...this.state,
        ...{
          cards: cards.data.cards,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  onChronoChange = async ()=>{
    const reverseChrono = !this.state.chrono
    this.setState({chrono: reverseChrono})

    try {  //not the best solution

      let cards = await api.get("/", {params: {filter: this.state.filter, chrono: reverseChrono}});
      if (!cards) throw new Error("Todo list is empty");

      this.setState({
        ...this.state,
        ...{
          cards: cards.data.cards,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
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
            onToggle={() => this.onToggleDone(element.id)}
            toggleEdit={() => this.toggleEdit(element.id, element.title)}
          />
        );
      });
    }
    let hider;
    this.state.edittable? hider= "" : hider="hide"

    let {filter, chrono} = this.state;
    let chronoDown;
    let chronoUp;

    if(chrono){
      chronoUp = 'greendiv'
      chronoDown = 'reddiv'
    } else{
      chronoUp = 'reddiv'
      chronoDown = 'greendiv'
    }

    return (
      <section className="main">
        <section className="main__left">
          <input type="button" value="all" className={filter == 'all'? 'green' : ''} onClick={this.toggleFilter}/>
          <input type="button" value="done" className={filter == 'done'? 'green' : ''} onClick={this.toggleFilter}/>
          <input type="button" value="undone" className={filter == 'undone'? 'green' : ''} onClick={this.toggleFilter}/>
        </section>
        <section className="main__left-toggler" onClick={this.onChronoChange}>
          <div className={`diver ${chronoDown}`} ><p>По хронологии</p></div>
          <div className={`diver ${chronoUp}`}><p>В обратной хронологии</p></div>
        </section>

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
        <p className={hider}>Поле для редактирования:  <input name="editCard" type="text" value={this.state.editCard} onChange={this.handleChange} onKeyPress={this.handleEditSubmit}
 /></p>
      </section>
    );
  }
}
