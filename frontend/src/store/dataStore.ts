import { create } from 'zustand';
import Todo from '../interfaces/Todo';
import NameObject from '../interfaces/NameObject';

type State = {
    todos: Todo[];
    lists: NameObject[];
};

type Action = {
    setLists: (lists: NameObject[]) => void;
    setTodos: (todos: Todo[]) => void;
    changeCompletedStatus: (id: number, completed: boolean) => void;
};

const useDataStore = create<State & Action>(set => ({
    todos: [],
    lists: [],
    setLists: (lists: NameObject[]) => set({ lists }),
    setTodos: (todos: Todo[]) => set({ todos }),
    changeCompletedStatus: (id: number, completed: boolean) =>
        set(state => ({
            todos: state.todos.map(todo =>
                todo.id === id ? { ...todo, completed } : todo
            ),
            lists: state.lists
        }))
    }));

export default useDataStore;
