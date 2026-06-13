import useShoppingStore from '@/store/useShoppingStore';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AddItemModal({ visible, onClose }: Props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const addItem = useShoppingStore(s => s.addItem);
  const theme = useShoppingStore(s => s.theme);

  const submit = () => {
    if (!name.trim()) {
      Toast.show({ type: 'error', text1: 'Item name required' });
      return;
    }
    addItem(name.trim(), quantity.trim());
    Toast.show({ type: 'success', text1: 'Item added' });
    setName('');
    setQuantity('');
  };

  const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 },
    modal: { backgroundColor: theme === 'dark' ? '#333' : 'white', borderRadius: 8, padding: 16 },
    title: { fontSize: 18, fontWeight: '600', color: theme === 'dark' ? '#fff' : '#000' },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    closeBtn: { padding: 8 },
    label: { marginTop: 12, marginBottom: 4, color: theme === 'dark' ? '#ccc' : '#000' },
    input: { borderWidth: 1, borderColor: theme === 'dark' ? '#555' : '#ddd', padding: 8, borderRadius: 6, color: theme === 'dark' ? '#fff' : '#000', backgroundColor: theme === 'dark' ? '#444' : '#fff' },
    row: { flexDirection: 'row', gap: 8, marginTop: 12, justifyContent: 'space-around' },
    button: { backgroundColor: '#2b8aef', padding: 10, borderRadius: 6 },
    ghost: { backgroundColor: theme === 'dark' ? '#555' : '#eee' },
    buttonText: { color: 'white', fontWeight: '600' },
    note: { marginTop: 10, color: theme === 'dark' ? '#aaa' : '#6b7280' },
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Add Item</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>✕</Text>
            </Pressable>
          </View>
          <Text style={styles.label}>Item</Text>
          <TextInput
            placeholder="e.g. Apples"
            placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize='words'
          />
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            placeholder="e.g. 2 bags"
            placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
            autoCapitalize='words'
          />
          <Text style={styles.note}>Submit adds the item and keeps the modal open so you can add more. Use cancel to exit.</Text>
          <View style={styles.row}>
            <Pressable style={styles.button} onPress={submit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.ghost]} onPress={onClose}>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
