import { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import AddItemModal from '@/components/AddItemModal';
import ConfirmClearModal from '@/components/ConfirmClearModal';
import ThemeToggle from '@/components/ThemeToggle';
import { useShoppingStore } from '@/store/useShoppingStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const items = useShoppingStore(state => state.items);
  const toggleSelect = useShoppingStore(state => state.toggleSelect);
  const markBoughtByIds = useShoppingStore(state => state.markBoughtByIds);
  const toggleBought = useShoppingStore(state => state.toggleBought);
  const clear = useShoppingStore(state => state.clear);
  const deleteItem = useShoppingStore(state => state.deleteItem);
  const theme = useShoppingStore(state => state.theme);

  const [addVisible, setAddVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const dark = theme === 'dark';
  // const isStoreLoading = useShoppingStore.persist.hasHydrated

  const selectedIds = useMemo(
    () => items.filter(item => item.selected).map(item => item.id),
    [items]
  );

  return (
    <View className={`${dark ? 'bg-slate-900' : 'bg-slate-100'} flex-1`}>
      <SafeAreaView className="flex-1">
        <View className="px-4 pt-10 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <View className="space-y-1">
              <Text className={`${dark ? 'text-white' : 'text-slate-900'} text-3xl font-bold`}>Item Lists</Text>
            </View>
            <ThemeToggle />
          </View>

          <View className={`${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} rounded-[30px] border shadow-sm overflow-hidden max-h-[70%]`}>
            <View className={`${dark ? 'bg-slate-900' : 'bg-slate-50'} flex-row px-4 py-4`}>
              <Text className={`${dark ? 'text-slate-200' : 'text-slate-700'} flex-1 font-bold text-lg`}>Item</Text>
              <Text className={`${dark ? 'text-slate-200' : 'text-slate-700'} w-28 text-right font-bold text-lg`}>Quantity</Text>
              <Text className={`${dark ? 'text-slate-200' : 'text-slate-700'} w-24 text-right font-bold text-lg`}>Status</Text>
            </View>
            <FlatList
              data={items}
              keyExtractor={item => item.id} renderItem={data => {
                const item = data.item;
                const rowClasses = [
                  'flex-row items-center px-4 py-4 border-t',
                  dark ? 'border-slate-800' : 'border-slate-200',
                  item.selected ? 'bg-blue-500/10' : '',
                  item.bought ? 'bg-emerald-500/10' : '',
                ].join(' ');
                return (
                  <Pressable key={item.id} onLongPress={() => toggleSelect(item.id)} className={rowClasses}>
                    <View className="flex-row items-center flex-1">
                      <Pressable onPress={() => toggleSelect(item.id)} className="mr-3">
                        <Text className={`${item.selected ? 'text-blue-500' : dark ? 'text-slate-300' : 'text-slate-700'} text-xl`}>
                          {Platform.OS === 'web' ? (item.selected ? '☑' : '☐') : item.selected ? '✓' : '○'}
                        </Text>
                      </Pressable>

                      {/* Item Name Row */}
                      <View className="flex-1">
                        <Text className={`${dark ? 'text-white' : 'text-slate-900'} font-semibold ${item.bought ? 'line-through opacity-70' : ''}`}>{item.name}</Text>
                      </View>

                      {/* Item Quantity Row */}
                      <View className="w-24 items-end">
                        <Text className={`${dark ? 'text-slate-400' : 'text-slate-500'} text-sm`}>{item.quantity || '–'}</Text>
                      </View>
                    </View>

                    <Pressable onPress={() => toggleBought(item.id)} className="w-24 items-end">
                      <Text className={`${item.bought ? 'text-emerald-400' : dark ? 'text-slate-300' : 'text-slate-600'} font-medium`}>
                        {item.bought ? 'Bought' : 'Pending'}
                      </Text>
                    </Pressable>
                  </Pressable>
                );
              }}

              ListEmptyComponent={() => (
                <View className="px-4 py-12 items-center">
                  <Text className={`${dark ? 'text-slate-400' : 'text-slate-500'}`}>No items yet. Tap Add Items to create your first list.</Text>
                </View>
              )}

              ListFooterComponent={() => (
                <View className={"h-4"} >
                  <Text className={"text-center text-slate-400 text-xs"}>End of List</Text>
                </View>
              )}
              className={"max-h-96:"}
            />
          </View>

          {selectedIds.length > 0 && (
            <View className={`mt-4 space-y-3 rounded-[28px] p-4 shadow ${dark ? 'bg-slate-900/80' : 'bg-white/80'}`}>
              <Text className={`${dark ? 'text-slate-300' : 'text-slate-600'} text-sm font-medium`}>{selectedIds.length} item(s) selected.</Text>
              <View className="flex-row gap-3">
                <Pressable onPress={() => markBoughtByIds(selectedIds, true)} className="flex-1 rounded-2xl bg-emerald-500 px-4 py-3">
                  <Text className="text-center text-white font-semibold">Mark Bought</Text>
                </Pressable>
                <Pressable onPress={() => markBoughtByIds(selectedIds, false)} className="flex-1 rounded-2xl bg-slate-300 px-4 py-3">
                  <Text className="text-center text-slate-900 font-semibold">Undo</Text>
                </Pressable>
                <Pressable onPress={() => deleteItem(selectedIds)} className="flex-1 rounded-2xl bg-rose-500 px-4 py-3">
                  <Text className="text-center text-white font-semibold">Delete</Text>
                </Pressable>
              </View>
            </View>
          )}

          <View className="mt-6 space-y-3">
            <Pressable onPress={() => setAddVisible(true)} className="rounded-[28px] bg-blue-600 px-5 py-4">
              <Text className="text-center text-white font-semibold">Add Items</Text>
            </Pressable>
            <Pressable onPress={() => setConfirmVisible(true)} className="rounded-[28px] bg-rose-500 px-5 py-4">
              <Text className="text-center text-white font-semibold">Clear List</Text>
            </Pressable>
          </View>
        </View>

        <AddItemModal visible={addVisible} onClose={() => setAddVisible(false)} />
        <ConfirmClearModal
          visible={confirmVisible}
          onConfirm={() => {
            clear();
            setConfirmVisible(false);
            Toast.show({ type: 'success', text1: 'List cleared' });
          }}
          onCancel={() => setConfirmVisible(false)}
        />
        <Toast />
      </SafeAreaView>
    </View>
  );
}
