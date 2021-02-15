import { React } from 'react';
import './todo-item.css';

export default function TodoItem({
  id,
  title,
  done,
  createdAt,
  onDelete,
  onToggle,
  toggleEdit,
  edittable,
}) {
  let linethrough;
  done ? (linethrough = 'done') : (linethrough = '');

  let block;
  edittable ? (block = 'item__edit') : (block = 'block');

  let dateOfCreate = createdAt;

  const regex = /[TZ]/gm;
  dateOfCreate = dateOfCreate.replace(regex, ' ');

  return (
    <li key={id}>
      <p className={linethrough} onDoubleClick={onToggle}>
        <span className="edit" onClick={toggleEdit}>
          &#10000;
        </span>
        {title}
        <span className="delete" onClick={onDelete} />
        <p className="dateOfCreate">{dateOfCreate}</p>
      </p>
    </li>
  );
}
