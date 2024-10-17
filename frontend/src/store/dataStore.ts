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
    renameTodo: (id: number, title: string) => void;
    addTodo: (title: string, id: number) => void;
    addList: (name: string, id: number) => void;
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
    renameTodo: (id: number, title: string) =>
        set((state: State) => ({ ...state, todos: state.todos.map(todo => (todo.id === id ? { ...todo, title } : todo)) })),
    addTodo: (title: string, id: number) =>
        set((state: State) => ({
            ...state,
            todos: [
                ...state.todos,
                {
                    id: id,
                    title,
                    completed: false,
                    important: false,
                    dueTo: '',
                },
            ],
        })),
    addList: (name: string, id: number) =>
        set((state: State) => ({
            ...state,
            lists: [
                ...state.lists,
                {
                    id: id,
                    name,
                },
            ].sort((a, b) => b.id - a.id),
        })),
});
