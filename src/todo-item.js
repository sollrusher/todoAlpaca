import { React } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './todo-item.css';

export default function TodoItem({
  id,
  index,
  title,
  text,
  done,
  createdAt,
  onDelete,
  onToggle,
  toggleEditTitle,
  editCard,
  editId,
  handleChange,
  handleEditSubmit,
  onModalOpen,
}) {
  let edittable = false;
  if (id == editId) {
    edittable = true;
  }

  let haveText = '';
  if(text) haveText='havetext'
  else haveText='notext'

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
    <Draggable draggableId={`${id}`} index={index}>
      {provided => (
    <li
    className={`task ${haveText}`}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref={provided.innerRef}
    >
      <div className={done ? 'done' : ''} onDoubleClick={onToggle}>
        <span className='task-title' onClick={toggleEditTitle}>{edittable ? inputEdit : title}</span>

        <p onClick={onModalOpen}>{text || 'text'}</p>
        <span className="delete" onClick={onDelete} />
        <p className="dateOfCreate">{dateOfCreate}</p>
      </div>
    </li>
    )}
    </Draggable>
  );
}
