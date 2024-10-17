import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';
import { changeCompletedStatus as databaseChangeCompletedStatus } from '../../graphQLRequests';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Todo from '../../interfaces/Todo';
import useDataStore from '../../store/dataStore';

export interface ToDoElementProps {
    todo: Todo;
    onImportant: (id: number, important: boolean) => void;
    onDelete: (id: number) => void;
}

export default function ToDoElement({ todo, onDelete, onImportant }: ToDoElementProps) {
    const storeChangeCompletedStatus = useDataStore(state => state.changeCompletedStatus);

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
                    <IconButton aria-label="delete" onClick={() => onImportant(todo.id, !todo.important)}>
                        {todo.important ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDelete(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}
