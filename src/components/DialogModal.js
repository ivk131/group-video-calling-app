import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import { DialogContent, ListItem, ListItemText } from "@material-ui/core";

function DialogModal({ open, setOpen, handleClose, users }) {
  const handleClosee = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClosee}
        open={open}
        style={{ position: "absolute", bottom: "20px" }}
      >
        <DialogContent>
          {users.map(user => (
            <ListItem key={user.uid}>
              <ListItemText>{user.uid} </ListItemText>
            </ListItem>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogModal;
