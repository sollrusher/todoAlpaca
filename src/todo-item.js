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
  editCard,
  editId,
  handleChange,
  handleEditSubmit,
}) {
  let edittable = false;
  if (id == editId) {
    edittable = true;
  }

  let dateOfCreate = createdAt;

  const regex = /[TZ]/gm;
  dateOfCreate = dateOfCreate.replace(regex, ' ');

  const inputEdit = (
    <input
      name="editCard"
      type="text"
      value={editCard}
      onChange={handleChange}
      onKeyPress={handleEditSubmit}
    />
  );

  return (
    <li>
      <div className={done ? 'done' : ''} onDoubleClick={onToggle}>
        <span className="edit" onClick={toggleEdit}>
          &#10000;
        </span>
        {edittable ? inputEdit : title}
        <span className="delete" onClick={onDelete} />
        <p className="dateOfCreate">{dateOfCreate}</p>
      </div>
    </li>
  );
}
