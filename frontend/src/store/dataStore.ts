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
    changeImportance: (id: number, important: boolean) => void;
    deleteTodo: (id: number) => void;
};

const useDataStore = create<State & Action>(set => ({
    todos: [],
    lists: [],
    setLists: (lists: NameObject[]) => set({ lists }),
    setTodos: (todos: Todo[]) => set({ todos }),
    changeCompletedStatus: (id: number, completed: boolean) =>
        set(state => ({ ...state, todos: state.todos.map(todo => (todo.id === id ? { ...todo, completed } : todo)) })),
    changeImportance: (id: number, important: boolean) =>
        set(state => ({ ...state, todos: state.todos.map(todo => (todo.id === id ? { ...todo, important } : todo)) })),
    deleteTodo: (id: number) => set(state => ({ ...state, todos: state.todos.filter(todo => todo.id !== id) })),
}));

export default useDataStore;
