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
  let sliceText = ''
  if(text) {
  haveText='havetext' ; 
  if(text.length > 15)
  sliceText = text.slice(0,35)+'...'
  else 
  sliceText= text;
}
  else haveText='notext'

  

  let dateOfCreate = createdAt;

  const regex = /[TZ]/gm;
  dateOfCreate = dateOfCreate.replace(regex, ' ').slice(0,-5);

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
      <span className="delete" onClick={onDelete} />
      <div className={done ? 'done' : ''} onDoubleClick={onToggle}>
        <span className='task-title' onClick={toggleEditTitle}>{edittable ? inputEdit : title}</span>
        <div onClick={onModalOpen}>
        <p className="task-text">{sliceText}</p>
        
        <p className="dateOfCreate">{dateOfCreate}</p>
        </div>
      </div>
    </li>
    )}
    </Draggable>
  );
}
