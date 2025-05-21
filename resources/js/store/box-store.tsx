import { create } from 'zustand';

type BoxState = {
  selectedBox: any;
  setSelectedBox: (box: string) => void;
};

export const useBoxStore = create<BoxState>((set) => ({
  selectedBox: '',
  setSelectedBox: (box) => set({ selectedBox: box }),
}));
