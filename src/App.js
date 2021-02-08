import React from 'react'
import Auth from './authPage'
import './app.css'
import Register from './registerPage';
import TodoList from './todoList';

function App() {
  return (
    <div className="app">
     {/*  <Auth/>  */}
      {/* <Register/> */}
      <TodoList/>
    </div>
  );
}

export default App;
