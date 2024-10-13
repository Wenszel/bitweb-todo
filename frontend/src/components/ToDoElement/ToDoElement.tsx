import DeleteIcon from '@mui/icons-material/Delete';

import { ListItem, ListItemText, Checkbox, IconButton, Box } from '@mui/material';
import Todo from '../../interfaces/Todo';

export interface ToDoElementProps {
    todo: Todo;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export default ({ todo, onToggleComplete, onDelete }: ToDoElementProps) => {
    return (
        <ListItem
            key={todo.id}
            sx={{
                bgcolor: todo.completed ? 'lightgray' : 'background.paper',
                mb: 1,
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': { bgcolor: '#f0f0f0' },
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': `checkbox-list-label-${todo.id}` }}
            />
            <ListItemText
                id={`checkbox-list-label-${todo.id}`}
                primary={todo.title}
                sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                }}
            />
            <Box sx={{ marginLeft: 'auto' }}>
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </ListItem>
    );
};
