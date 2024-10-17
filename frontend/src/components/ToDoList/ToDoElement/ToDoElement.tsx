import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Todo from '../../../interfaces/Todo';
import { useBoundStore } from '../../../store/boundStore';
import { useHandleCompleted } from '../../../hooks/todos/useHandleCompleted';
import { useHandleImportance } from '../../../hooks/todos/useHandleImportance';
import { useHandleDelete } from '../../../hooks/todos/useHandleDelete';
import TodoName from './TodoName/TodoName';
import DateChooser from './DateChooser/DateChooser';

export interface ToDoElementProps {
    todo: Todo;
}

export default function ToDoElement({ todo }: ToDoElementProps) {
    const setXContextMenu = useBoundStore(state => state.setXContextMenu);
    const setYContextMenu = useBoundStore(state => state.setYContextMenu);
    const setShowContextMenu = useBoundStore(state => state.setShowContextMenu);
    const setModifyingTodo = useBoundStore(state => state.setModifyingTodo);

    const handleDelete = useHandleDelete();
    const handleCompleted = useHandleCompleted();
    const handleImportance = useHandleImportance();

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setXContextMenu(e.clientX);
        setYContextMenu(e.clientY);
        setModifyingTodo(todo);
        setShowContextMenu(true);
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
                        onChange={() => handleCompleted(todo)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${todo.id}` }}
                    />
                </TableCell>
                <TableCell>
                    <DateChooser todoId={todo.id} dueDate={todo.dueTo} />
                </TableCell>
                <TableCell>
                    <TodoName todo={todo} />
                </TableCell>
                <TableCell>
                    <IconButton aria-label="delete" onClick={() => handleImportance(todo)}>
                        {todo.important ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(todo)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}
