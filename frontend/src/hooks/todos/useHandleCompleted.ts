import Todo from '../../interfaces/Todo';
import { changeCompletedStatus as databaseChangeCompletedStatus } from '../../graphQLRequests';
import { useBoundStore } from '../../store/boundStore';

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

export const useHandleCompleted = () => {
    const storeChangeCompletedStatus = useBoundStore(state => state.changeCompletedStatus);
    return createHandleCompleted(storeChangeCompletedStatus);
};
