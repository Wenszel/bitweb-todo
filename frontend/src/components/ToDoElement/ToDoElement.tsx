import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';
import {
    changeCompletedStatus as databaseChangeCompletedStatus,
    changeImportance as databaseChangeImportance,
    removeTodoById,
} from '../../graphQLRequests';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Todo from '../../interfaces/Todo';
import { useBoundStore } from '../../store/boundStore';

export interface ToDoElementProps {
    todo: Todo;
}

export default function ToDoElement({ todo }: ToDoElementProps) {
    const storeChangeCompletedStatus = useBoundStore(state => state.changeCompletedStatus);
    const storeChangeImportance = useBoundStore(state => state.changeImportance);
    const storeDeleteTodo = useBoundStore(state => state.deleteTodo);

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    const handleCompleted = async () => {
        try {
            await databaseChangeCompletedStatus(todo.id, !todo.completed);
            storeChangeCompletedStatus(todo.id, !todo.completed);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImportance = async () => {
        try {
            await databaseChangeImportance(todo.id, !todo.important);
            storeChangeImportance(todo.id, !todo.important);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await removeTodoById(todo.id);
            storeDeleteTodo(todo.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <TableRow
                key={todo.id}
                onContextMenu={handleRightClick}
                sx={{
                    bgcolor: todo.completed ? 'lightgray' : 'background.paper',
                    transition: 'all 0.3s',
                    '&:hover': { bgcolor: '#f0f0f0' },
                }}
            >
                <TableCell>
                    <Checkbox
                        edge="start"
                        checked={todo.completed}
                        onChange={handleCompleted}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${todo.id}` }}
                    />
                </TableCell>
                <TableCell>10.10.2024</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>
                    <IconButton aria-label="delete" onClick={handleImportance}>
                        {todo.important ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}
