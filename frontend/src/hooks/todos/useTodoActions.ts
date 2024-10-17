import { useBoundStore } from '../../store/boundStore';
import Todo from '../../interfaces/Todo';
import { ContextMenuAction } from '../../components/ContextMenu/ContextMenu';
import { useHandleCompleted } from './useHandleCompleted';
import { useHandleImportance } from './useHandleImportance';
import { useHandleDelete } from './useHandleDelete';

export const useTodoActions = () => {
    const handleCompleted = useHandleCompleted();
    const handleImportance = useHandleImportance();
    const handleDelete = useHandleDelete();
    const setModifyingTodo = useBoundStore(state => state.setModifyingTodo);
    const setShowContextMenu = useBoundStore(state => state.setShowContextMenu);
    const setModifyingTodoName = useBoundStore(state => state.setModifyTodoName);

    const modifyingTodo: Todo | null = useBoundStore(state => state.modifyingTodo);
    if (!modifyingTodo) {
        return [];
    }
    const todoActions: ContextMenuAction[] = [
        {
            action: 'Delete',
            handler: () => {
                handleDelete(modifyingTodo);
                setShowContextMenu(false);
                setModifyingTodo(null);
            },
        },
        { action: 'Change date', handler: () => console.log('Change date') },
        {
            action: 'Rename',
            handler: () => {
                setModifyingTodo(modifyingTodo);
                setModifyingTodoName(true);
            },
        },
        {
            action: 'Mark as important',
            handler: () => {
                handleImportance(modifyingTodo);
                setShowContextMenu(false);
            },
        },
        {
            action: 'Mark as completed',
            handler: () => {
                handleCompleted(modifyingTodo);
                setShowContextMenu(false);
            },
        },
    ];

    return todoActions;
};
