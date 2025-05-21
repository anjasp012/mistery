import { create } from 'zustand';

type BoxState = {
  historySelectedBox: any;
  setHistorySelectedBox: (box: string) => void;
};

export const useHistoryBoxStore = create<BoxState>((set) => ({
  historySelectedBox: '',
  setHistorySelectedBox: (box) => set({ historySelectedBox: box }),
}));
