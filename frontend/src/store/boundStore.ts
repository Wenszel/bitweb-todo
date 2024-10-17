import { create } from 'zustand';
import { createDataStore, DataStoreSlice } from './dataStore';
import { createSelectedStore, SelectedStoreSlice } from './selectedStore';
export const useBoundStore = create<DataStoreSlice & SelectedStoreSlice>()((...a) => ({
    ...createDataStore(...a),
    ...createSelectedStore(...a),
}));
