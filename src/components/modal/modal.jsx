import './modal.css';
import React from 'react';
import {
  Button,
  Typography,
  Dialog,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const styles = (theme) => ({
  root: {
    minWidth: 300,
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const InputLine = withStyles((theme) => ({
    root: {
      width: 500,
      
    },
  }))(OutlinedInput);

export default function CustomizedDialogs(props) {
  return (
    <Dialog
      onClose={props.onModalClose}
      aria-labelledby='customized-dialog-title'
      open={props.isOpened}
    >
      <DialogTitle id='customized-dialog-title' onClose={props.onModalClose}>
        {props.card.title}
      </DialogTitle>
      <DialogContent dividers>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='component-outlined'>Your text card</InputLabel>
          <InputLine
            name="editText"
            value={props.editText || ''}
            onChange={props.handleChange}
            label='Your text card'
            multiline
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onModalClose} color='primary'>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
