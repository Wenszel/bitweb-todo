import { ContextMenuAction } from '../ContextMenu/ContextMenu';
import {
    changeCompletedStatus as databaseChangeCompletedStatus,
    changeImportance as databaseChangeImportance,
    removeTodoById,
} from '../../graphQLRequests';
import Todo from '../../interfaces/Todo';
import { useBoundStore } from '../../store/boundStore';

export const useTodoActions = () => {
    const handleCompleted = useHandleCompleted();
    const handleImportance = useHandleImportance();
    const handleDelete = useHandleDelete();
    const setModifyingTodo = useBoundStore(state => state.setModifyingTodo);
    const setShowContextMenu = useBoundStore(state => state.setShowContextMenu);
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
        { action: 'Rename', handler: () => console.log('Edit') },
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

const createHandleCompleted = (storeChangeCompletedStatus: (id: number, completed: boolean) => void) => {
    return async (todo: Todo) => {
        try {
            await databaseChangeCompletedStatus(todo.id, !todo.completed);
            storeChangeCompletedStatus(todo.id, !todo.completed);
        } catch (error) {
            console.error(error);
        }
    };
};

const createHandleImportance = (storeChangeImportance: (id: number, important: boolean) => void) => {
    return async (todo: Todo) => {
        try {
            await databaseChangeImportance(todo.id, !todo.important);
            storeChangeImportance(todo.id, !todo.important);
        } catch (error) {
            console.error(error);
        }
    };
};

const createHandleDelete = (storeDeleteTodo: (id: number) => void) => {
    return async (todo: Todo) => {
        try {
            await removeTodoById(todo.id);
            storeDeleteTodo(todo.id);
        } catch (error) {
            console.error(error);
        }
    };
};

export const useHandleDelete = () => {
    const storeDeleteTodo = useBoundStore(state => state.deleteTodo);
    return createHandleDelete(storeDeleteTodo);
};

export const useHandleImportance = () => {
    const storeChangeImportance = useBoundStore(state => state.changeImportance);
    return createHandleImportance(storeChangeImportance);
};

export const useHandleCompleted = () => {
    const storeChangeCompletedStatus = useBoundStore(state => state.changeCompletedStatus);
    return createHandleCompleted(storeChangeCompletedStatus);
};
