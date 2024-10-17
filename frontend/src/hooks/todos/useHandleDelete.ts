import Todo from "../../interfaces/Todo"
import { useBoundStore } from "../../store/boundStore"
import { removeTodoById } from "../../graphQLRequests"

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