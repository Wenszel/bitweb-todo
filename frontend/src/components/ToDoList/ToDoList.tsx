import { Typography, Paper, Table, TableContainer, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
import Todo from '../../interfaces/Todo';
import ToDoElement from '../ToDoElement/ToDoElement';
import useDataStore from '../../store/dataStore';

interface ToDoListProps {
    listName: string;
    onDelete: (id: number) => void;
    onImportant: (id: number, important: boolean) => void;
}

const ToDoList = ({ listName, onDelete, onImportant }: ToDoListProps) => {
    const todos = useDataStore(state => state.todos);

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
                                <ToDoElement key={todo.id} todo={todo} onDelete={onDelete} onImportant={onImportant} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default ToDoList;
