import { StateCreator } from 'zustand';
import NameObject from '../interfaces/NameObject';

type State = {
    selectedList: NameObject;
};

type Action = {
    setSelectedList: (list: NameObject) => void;
};

export type SelectedStoreSlice = State & Action;

export const createSelectedStore: StateCreator<SelectedStoreSlice, [], [], SelectedStoreSlice> = set => ({
    selectedList: { id: -1, name: 'Inbox' },
    setSelectedList: (list: NameObject) => set({ selectedList: list }),
});
