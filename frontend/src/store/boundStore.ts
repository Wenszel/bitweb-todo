import { create } from 'zustand';
import { createDataStore, DataStoreSlice } from './dataStore';
import { createSelectedStore, SelectedStoreSlice } from './selectedStore';
import { createUIStoreSlice, UIStoreSlice } from './uiStore';

export const useBoundStore = create<DataStoreSlice & SelectedStoreSlice & UIStoreSlice>()((...a) => ({
    ...createDataStore(...a),
    ...createSelectedStore(...a),
    ...createUIStoreSlice(...a),
}));
