import Todo from '../../interfaces/Todo';
import { changeImportance as databaseChangeImportance } from '../../graphQLRequests';
import { useBoundStore } from '../../store/boundStore';

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

export const useHandleImportance = () => {
    const storeChangeImportance = useBoundStore(state => state.changeImportance);
    return createHandleImportance(storeChangeImportance);
};