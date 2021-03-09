import { React } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import DoneIcon from '@material-ui/icons/Done';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    marginBottom: 5,
    minWidth: 275,
    width: '100%',
    background: props.text
      ? 'linear-gradient(45deg, #6ba6fe 5%, #ffffff 80%)'
      : 'linear-gradient(45deg, #fead6b 5%, #ffffff 80%)',
  }),
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  footer: {
    justifyContent: 'space-between',
  },
  button: {
    marginLeft: 8,
  },
  dateOfCreate: {
    marginLeft: '1%',
  },
}));

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
  const classes = useStyles({ text });

  let edittable = false;
  if (id == editId) {
    edittable = true;
  }

  let haveText = '';
  let sliceText = '';
  let hasDone = '';
  done ? (hasDone = 'done') : (hasDone = '');

  if (text) {
    haveText = 'havetext';
    if (text.length > 15) sliceText = text.slice(0, 35) + '...';
    else sliceText = text;
  } else haveText = 'notext';

  let dateOfCreate = createdAt;
  const regex = /[TZ]/gm;
  dateOfCreate = dateOfCreate.replace(regex, ' ').slice(0, -5);

  const inputEdit = (
    <TextField
      name='editCard'
      label={title}
      value={editCard}
      onChange={handleChange}
      onKeyPress={handleEditSubmit}
    />
  );

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <Card
          className={classes.root}
          variant='outlined'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={onModalOpen}
        >
          <CardContent className={hasDone} >
            <Typography variant='h5' component='h2' onClick={toggleEditTitle}>
              {edittable ? inputEdit : title}
            </Typography>
            <Typography variant='body2' component='p' >
              {sliceText}
            </Typography>
          </CardContent>
          <CardActions className={classes.footer}>
            <Typography
              variant='body2'
              component='p'
              className={classes.dateOfCreate}
            >
              {dateOfCreate}
            </Typography>
            <Box>
              <ToggleButton
                value='check'
                selected={done}
                onChange={onToggle}
                className={classes.button}
                size='small'
              >
                {done ? (
                  <DoneIcon fontSize='small' />
                ) : (
                  <DoneOutlineIcon fontSize='small' />
                )}
              </ToggleButton>

              <Button
                variant='contained'
                color='secondary'
                size='small'
                className={classes.button}
                onClick={onDelete}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
}
