import { Typography, Paper, Table, TableContainer, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
import Todo from '../../interfaces/Todo';
import ToDoElement from '../ToDoElement/ToDoElement';
import {useBoundStore }from '../../store/boundStore';


const ToDoList = () => {
    const todos = useBoundStore(state => state.todos);
    const listName = useBoundStore(state => state.selectedList).name;

    return (
        <>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 1 }}>
                {listName}
            </Typography>
            <Paper elevation={4} sx={{ width: '100%', overflow: 'scroll' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: 50 }}></TableCell>
                                <TableCell sx={{ width: 100 }}>Date</TableCell>
                                <TableCell sx={{ width: 250 }}>Title</TableCell>
                                <TableCell sx={{ width: 80 }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.map((todo: Todo) => (
                                <ToDoElement key={todo.id} todo={todo} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default ToDoList;
