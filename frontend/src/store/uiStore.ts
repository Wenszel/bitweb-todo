import { StateCreator } from 'zustand';
import Todo from '../interfaces/Todo';

type State = {
    xContextMenu: number;
    yContextMenu: number;
    showContextMenu: boolean;
    showNewList: boolean;
    modifyingTodo: Todo | null;
    modifyTodoName: boolean
};

type Action = {
    setXContextMenu: (x: number) => void;
    setYContextMenu: (y: number) => void;
    setShowContextMenu: (show: boolean) => void;
    setShowNewList: (show: boolean) => void;
    setModifyingTodo: (todo: Todo | null) => void;
    setModifyTodoName: (modify: boolean) => void;
};

export type UIStoreSlice = State & Action;

export const createUIStoreSlice: StateCreator<UIStoreSlice, [], [], UIStoreSlice> = set => ({
    showNewList: false,
    showContextMenu: false,
    xContextMenu: 0,
    yContextMenu: 0,
    modifyingTodo: null,
    modifyTodoName: false,
    setXContextMenu: (x: number) => set({ xContextMenu: x }),
    setYContextMenu: (y: number) => set({ yContextMenu: y }),
    setShowContextMenu: (show: boolean) => set({ showContextMenu: show }),
    setShowNewList: (show: boolean) => set({ showNewList: show }),
    setModifyingTodo: (todo: Todo | null) => set({ modifyingTodo: todo }),
    setModifyTodoName: (modify: boolean) => set({ modifyTodoName: modify })
});
