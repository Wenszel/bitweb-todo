import { StateCreator } from 'zustand';
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
    addTodo: (title: string) => void;
    deleteTodo: (id: number) => void;
};

export type DataStoreSlice = State & Action;

export const createDataStore: StateCreator<DataStoreSlice, [], [], DataStoreSlice> = set => ({
    todos: [],
    lists: [],
    setLists: (lists: NameObject[]) => set({ lists }),
    setTodos: (todos: Todo[]) => set({ todos }),
    changeCompletedStatus: (id: number, completed: boolean) =>
        set((state: State) => ({ ...state, todos: state.todos.map(todo => (todo.id === id ? { ...todo, completed } : todo)) })),
    changeImportance: (id: number, important: boolean) =>
        set((state: State) => ({ ...state, todos: state.todos.map(todo => (todo.id === id ? { ...todo, important } : todo)) })),
    deleteTodo: (id: number) => set((state: State) => ({ ...state, todos: state.todos.filter(todo => todo.id !== id) })),
    addTodo: (title: string) =>
        set((state: State) => ({
            ...state,
            todos: [
                ...state.todos,
                {
                    id: state.todos.length + 1,
                    title,
                    completed: false,
                    important: false,
                    dueTo: '',
                },
            ],
        })),
});
