import { StateCreator } from 'zustand';

type State = {
    showNewList: boolean;
};

type Action = {
    setShowNewList: (show: boolean) => void;
};

export type UIStoreSlice = State & Action;

export const createUIStoreSlice: StateCreator<UIStoreSlice, [], [], UIStoreSlice> = set => ({
    showNewList: false,
    setShowNewList: (show: boolean) => set({ showNewList: show }),
});
