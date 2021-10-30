import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteDialog from "./DeleteDialog";

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState( null);


    return (
        <Fragment>
            <form onSubmit={(event) => {
                context.createTodo(event, {name: addTodo})
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ваши задачи</TableCell>
                            <TableCell align='right'>Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField value={addTodo} onChange={() => {
                                    setAddTodo(event.target.value)
                                }} label="Здесь надо водить новую задачу" fullWidth={true}/>
                            </TableCell>
                            <TableCell>
                                <IconButton type="submit"><AddIcon/></IconButton>
                            </TableCell>
                        </TableRow>

                        {context.todos.slice().reverse().map((todoV, index) => (
                            <TableRow key={'todo' + index}>
                                <TableCell>

                                    {editIsShown === todoV.id ?
                                        <TextField
                                            fullWidth={true}
                                            value={editTodo}
                                            onChange={(event) => {
                                                setEditTodo(event.target.value);
                                            }}
                                            InputProps={{
                                                endAdornment: <Fragment>
                                                    <IconButton onClick={() => {
                                                        setEditIsShown(false);
                                                    }}><CloseIcon/></IconButton>

                                                    <IconButton onClick={() => {
                                                        context.updateTodo({id: todoV.id, name: editTodo});
                                                        setEditIsShown(false);
                                                    }}><DoneIcon/></IconButton>
                                                </Fragment>,
                                            }}/>
                                        : todoV.name
                                    }
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={() => {
                                        setEditIsShown(todoV.id);
                                        setEditTodo(todoV.name)
                                    }}>
                                        <EditIcon/>
                                    </IconButton>
--
                                    <IconButton onClick={() => {
                                        setDeleteConfirmationIsShown(true);
                                        setTodoToBeDeleted(todoV);
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </form>

            {deleteConfirmationIsShown && (
            <DeleteDialog todo={todoToBeDeleted}
                          open={deleteConfirmationIsShown}
                          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
            />
            )}
        </Fragment>
    );
}

export default TodoTable;