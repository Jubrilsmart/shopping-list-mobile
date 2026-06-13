import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Item = {
  id: string;
  name: string;
  quantity: string;
  bought?: boolean;
  selected?: boolean;
};

type ShoppingState = {
  items: Item[];
  addItem: (name: string, quantity: string) => void;
  clear: () => void;
  deleteItem: (ids: string[]) => void;
  toggleSelect: (id: string) => void;
  markBoughtByIds: (ids: string[], bought: boolean) => void;
  toggleBought: (id: string) => void;
  toggleTheme?: () => void;
  theme?: 'light' | 'dark';
};

export const useShoppingStore = create<ShoppingState>()(
  persist<ShoppingState>(
    (set: any, get: any) => ({
      items: [] as Item[],
      addItem: (name: string, quantity: string) => {
        const id = Date.now().toString();
        const item: Item = { id, name, quantity, bought: false, selected: false };
        set({ items: [item, ...get().items] });
      },

      clear: () => set({ items: [] }),

      deleteItem: (ids: string[]) =>
        set({
          items: get().items.map((i: Item) =>
            (ids.includes(i.id) ? { ...i, selected: false } : i)).filter((i: Item) =>
              !ids.includes(i.id))
        }),

      toggleSelect: (id: string) =>
        set({ items: get().items.map((i: Item) => (i.id === id ? { ...i, selected: !i.selected } : i)) }),

      markBoughtByIds: (ids: string[], bought: boolean) =>
        set({
          items: get().items.map((i: Item) => (ids.includes(i.id) ? { ...i, bought, selected: false } : i)),
        }),

      toggleBought: (id: string) =>
        set({ items: get().items.map((i: Item) => (i.id === id ? { ...i, bought: !i.bought } : i)) }),

      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      theme: 'light',
    }),
    {
      name: 'shopping-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useShoppingStore;
