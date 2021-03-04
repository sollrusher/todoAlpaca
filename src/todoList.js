import { React } from 'react';
import { Component } from 'react';
import './todoList.css';
import TodoItem from './todo-item';
import api from './utils/api';
import { getUser } from './utils/get-user';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Modal from './components/modal/modal';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCard: '',
      edittable: false,
      editId: '',
      editCard: '',
      editText: '',
      filter: 'all',
      chrono: false,
      userId: '',
      login: '',
      modal: {
        card: '',
        open: false,
      },
    };
  }

  escListener = (event) => {
    if (event.key === 'Escape') {
      this.setState({ editId: '', editCard: '', modal: {open: false, card: ''} });
      return;
    }
  };

  exitClickListener = (event) =>{
    if(event.target.className === 'modal__wrapper open'){
      this.setState({editId: '', editCard: '',modal: {open: false, card: ''} });
      return;
    }
  }

  async componentDidMount() {
    try {
      this.getUserByToken();
      let cards = await api.get('/get', {
        params: { filter: this.state.filter, chrono: this.state.chrono },
      });
      if (!cards) throw new Error('Todo list is empty');

      this.setState({
        ...this.state,
        ...{
          cards: cards.data.cards,
        },
      });

      document.addEventListener('keydown', this.escListener, false);
      document.addEventListener('click', this.exitClickListener, false);
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escListener, false);
    document.removeEventListener('click', this.exitClickListener, false);
  }

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async (event) => {
    if (
      event.key == 'Enter' &&
      this.state.newCard !== '' &&
      this.state.newCard[0] !== ' ' &&
      this.state.newCard.length < 20
    ) {
      const newTodo = await api.post('/card', {
        title: this.state.newCard,
        index: this.state.cards.length,
      });
      if (this.state.cards) {
        const oldArr = this.state.cards;
        oldArr.push(newTodo.data);
        this.setState({
          ...this.state,
          ...{
            cards: oldArr,
          },
        });
        this.setState({
          newCard: '',
        });
      }
    }
  };

  onDelete = (id) => {
    const newArr = this.state.cards.filter((item) => {
      if (item.id !== id) return item;
    });
    this.setState({
      ...this.state,
      ...{
        cards: newArr,
      },
    });

    api.delete('/delete', { params: { id: id } });
  };

  onToggleDone = (id) => {
    const newArr = this.state.cards.filter((item) => {
      if (item.id == id) {
        item.done = !item.done;
        const { done, title } = item;
        api.put('/put', { id, done, title });
      }
      return item;
    });
    this.setState({
      ...this.state,
      ...{
        cards: newArr,
      },
    });
  };

  toggleEdit = (id, title) => {
    this.setState({ editId: id });
    this.setState({ editCard: title });
  };

  handleEditTitleSubmit = async (event) => {
    if (
      event.key == 'Enter' &&
      this.state.editCard !== '' &&
      this.state.editCard[0] !== ' ' &&
      this.state.editCard.length < 20
    ) {
      const value = this.state.editCard;
      const id = this.state.editId;
      await api.put('/put', { id, title: value });
      this.setState({ editId: '' });

      try {
        //not the best solution
        let cards = await api.get('/get', {
          params: { filter: this.state.filter, chrono: this.state.chrono },
        });
        if (!cards) throw new Error('Todo list is empty');

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
  };

  toggleFilter = async (event) => {
    const value = event.target.value;

    this.setState({ filter: value });

    try {
      //not the best solution
      let cards = await api.get('/get', {
        params: { filter: value, chrono: this.state.chrono },
      });
      if (!cards) throw new Error('Todo list is empty');
      this.setState({
        ...this.state,
        ...{
          cards: cards.data.cards,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  onChronoChange = async () => {
    const reverseChrono = !this.state.chrono;
    this.setState({ chrono: reverseChrono });

    try {
      //not the best solution

      let cards = await api.get('/get', {
        params: { filter: this.state.filter, chrono: reverseChrono },
      });
      if (!cards) throw new Error('Todo list is empty');

      this.setState({
        ...this.state,
        ...{
          cards: cards.data.cards,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  getUserByToken = async () => {
    const user = await getUser();
    const { login, id } = user;
    this.setState({ login: login });
    this.setState({ userId: id });
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let oldArr = this.state.cards;
    let item = oldArr[source.index];
    oldArr.splice(source.index, 1);

    oldArr.splice(destination.index, 0, item);

    this.setState({
      ...this.state,
      ...{
        cards: oldArr,
      },
    });

    this.state.cards.forEach((element, index) => {
      api.put('/put', { id: element.id, index });
    });
  };

  onModalOpen = (id) => {
    const item = this.state.cards.find((element) => {
      if (element.id == id) return element;
    });

    const newModal = { open: true, card: item };

    this.setState({ modal: newModal, editText: item.text});
  };

  onModalClose = async() => {
    const { editText } = this.state
    const { id } = this.state.modal.card

    await api.put('/put', { id, text: editText });
    const modal = { open: false, card: '' };
    this.setState({modal})
    try {
      //not the best solution
      let cards = await api.get('/get', {
        params: { filter: this.state.filter, chrono: this.state.chrono },
      });
      if (!cards) throw new Error('Todo list is empty');

      this.setState({
        ...this.state,
        ...{
          cards: cards.data.cards,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  toggleEditText = async (event) => {
    if (
      event.key == 'Enter'
    ) {
      const value = this.state.editText;
      const id = this.state.modal.card.id;
      await api.put('/put', { id, text: value });
      this.setState({ editId: '' });

      try {
        //not the best solution
        let cards = await api.get('/get', {
          params: { filter: this.state.filter, chrono: this.state.chrono },
        });
        if (!cards) throw new Error('Todo list is empty');

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

  render() {
    const name = this.state.login;
    let todos;
    if (this.state.cards) {
      todos = this.state.cards.map((element, index) => {
        return (
          <TodoItem
            key={element.id}
            id={element.id}
            index={index}
            title={element.title}
            text={element.text}
            done={element.done}
            createdAt={element.createdAt}
            onDelete={() => this.onDelete(element.id)}
            onToggle={() => this.onToggleDone(element.id)}
            toggleEditTitle={() =>
              this.toggleEdit(element.id, element.title)
            }
            editCard={this.state.editCard}
            editId={this.state.editId}
            handleChange={this.handleChange}
            handleEditSubmit={this.handleEditTitleSubmit}
            onModalOpen={() => this.onModalOpen(element.id)}
          />
        );
      });
    }
    let hider;
    this.state.edittable ? (hider = '') : (hider = 'hide');

    let { filter, chrono } = this.state;
    let chronoDown;
    let chronoUp;

    if (chrono) {
      chronoUp = 'greendiv';
      chronoDown = 'reddiv';
    } else {
      chronoUp = 'reddiv';
      chronoDown = 'greendiv';
    }

    return (
      <>
        <Modal
          isOpened={this.state.modal.open}
          onModalClose={this.onModalClose}
          card={this.state.modal.card}
          edittable={this.state.edittable}
          editText={this.state.editText}
          handleChange={this.handleChange}
          toggleEditText={this.toggleEditText}
        />
        <section className='main'>
          <section className='main__left'>
            <input
              type='button'
              value='all'
              className={filter == 'all' ? 'green' : ''}
              onClick={this.toggleFilter}
            />
            <input
              type='button'
              value='done'
              className={filter == 'done' ? 'green' : ''}
              onClick={this.toggleFilter}
            />
            <input
              type='button'
              value='undone'
              className={filter == 'undone' ? 'green' : ''}
              onClick={this.toggleFilter}
            />
          </section>
          {/* <section className='main__left-toggler' onClick={this.onChronoChange}>
          <div className={`diver ${chronoDown}`}>
            <p>По хронологии</p>
          </div>
          <div className={`diver ${chronoUp}`}>
            <p>В обратной хронологии</p>
          </div>
        </section> */}

          <section className='main__head'>
            <h1>Здравствуйте, {name}</h1>
            <input
              name='newCard'
              className='newItem'
              type='textarea'
              placeholder='Новое дело ?'
              value={this.state.newCard}
              onChange={this.handleChange}
              onKeyPress={this.handleSubmit}
            />
            <h2>Ваши запланированые дела: </h2>
          </section>
          <section className='main__list'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId={'column-1'}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {todos}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </section>
        </section>
      </>
    );
  }
}
