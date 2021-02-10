import { React } from "react";
import "./todo-item.css";



export default function TodoItem({ id, title, done, createdAt, onDelete, onToggle }) {
  let classer;
  done ? (classer = "done") : (classer = "");

  
  return (
    <li key={id}>
      <p className={classer} onDoubleClick={onToggle}>
        <span className="edit">&#10000;</span> 
        {title}
        <span className="delete" onClick={onDelete} />
      </p>
    </li>
  );
}
