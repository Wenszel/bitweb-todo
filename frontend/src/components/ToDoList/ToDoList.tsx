import { Typography, Paper, Table, TableContainer, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
import Todo from '../../interfaces/Todo';
import ToDoElement from '../ToDoElement/ToDoElement';

interface ToDoListProps {
    todos: Todo[];
    listName: string;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onImportant: (id: number, important: boolean) => void;
}

const ToDoList = ({ todos, listName, onToggleComplete, onDelete, onImportant }: ToDoListProps) => {
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
                            {todos.map(todo => (
                                <ToDoElement key={todo.id} todo={todo} onToggleComplete={onToggleComplete} onDelete={onDelete} onImportant={onImportant} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default ToDoList;
