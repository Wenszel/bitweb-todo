import DeleteIcon from '@mui/icons-material/Delete';

import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Todo from '../../interfaces/Todo';

export interface ToDoElementProps {
    todo: Todo;
    onToggleComplete: (id: number) => void;
    onImportant: (id: number, important: boolean) => void;
    onDelete: (id: number) => void;
}

export default ({ todo, onToggleComplete, onDelete, onImportant }: ToDoElementProps) => {
    return (
        <TableRow
            key={todo.id}
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
                    onChange={() => onToggleComplete(todo.id)}
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
    );
};
