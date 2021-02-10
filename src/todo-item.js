import { React } from "react";
import "./todo-item.css";



export default function TodoItem({ id, title, done, createdAt, onDelete }) {
  let classer;
  done ? (classer = "done") : (classer = "");

  function clog() {
    console.log('Gegagl', id)
}
  
  return (
    <li key={id}>
      <p className={classer} onDoubleClick={()=>clog(id)}>
        <span className="edit">&#10000;</span> 
        {title}
        <span className="delete" onClick={onDelete} />
      </p>
    </li>
  );
}
