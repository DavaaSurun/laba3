import React, {useContext} from 'react';
import {Button, Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import PropTypes from 'prop-types';
import {TodoContext} from "../contexts/TodoContext";


function DeleteDialog(props) {
    const hide = () => {
        props.setDeleteConfirmationIsShown(false);
    };

    const context = useContext(TodoContext);

    return (
        <Dialog onClose={hide} fullWidth={true} maxWidth='sm' open={props.open}>
            <DialogTitle>Задача будет утеряна навсегда! Уверен?</DialogTitle>
            <DialogContent>
                {props.todo.name}
            </DialogContent>
            <DialogContent>
                <Button onClick={hide}>Отмена</Button>
                <Button onClick={() => {
                    context.deleteTodo({id: props.todo.id, name: props.todo.name});
                    hide();
                }}
                >Удалить</Button>
            </DialogContent>
        </Dialog>
    )
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.object,

}
export default DeleteDialog;