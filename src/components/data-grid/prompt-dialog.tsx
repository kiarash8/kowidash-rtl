import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PromptDialogProps } from './model';

const PromptDialog: React.FC<PromptDialogProps> = ({option, button, data}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  const agree = () => {
    option.agree.callback(data);
    handleClose();
  }

  const disagree = () => {
    option.disagree.callback(data);
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleClickOpen} variant={button.variant} color={button.color}  disabled={button.disabled !== undefined ? button.disabled : false}>{button.caption}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{option.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{option.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagree} variant={option.disagree.variant} color={option.disagree.color}>{option.disagree.caption}</Button>
          <Button onClick={agree} variant={option.agree.variant} color={option.agree.color}>{option.agree.caption}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PromptDialog;
