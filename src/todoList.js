import { React } from 'react';
import { Component } from 'react';
import './todoList.css'

export default class TodoList extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        const name = 'Данила'
        return(
            <section className='main'>
                <section className="main__head">
                    <h1>Здравствуйте, {name}</h1>
                    <h2>Ваши запланированые дела: </h2>
                </section>
                <section className="main__list">
                    <ul>
                        <li>Выкинуть мусор</li>
                        <li>Вынести дверь</li>
                        <li>Возвеличивать царя</li>
                    </ul>
                </section>
            </section>
        )
    }
}