import useShoppingStore from '@/store/useShoppingStore';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmClearModal({ visible, onConfirm, onCancel }: Props) {
  const theme = useShoppingStore(s => s.theme);

  const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 },
    modal: { backgroundColor: theme === 'dark' ? '#333' : 'white', borderRadius: 8, padding: 16 },
    title: { fontSize: 18, fontWeight: '600', color: theme === 'dark' ? '#fff' : '#000' },
    message: { marginTop: 8, color: theme === 'dark' ? '#ccc' : '#666' },
    row: { flexDirection: 'row', gap: 8, marginTop: 12 },
    button: { padding: 10, borderRadius: 6 },
    danger: { backgroundColor: '#d9534f' },
    ghost: { backgroundColor: theme === 'dark' ? '#555' : '#eee' },
  });

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.title}>Clear List</Text>
          <Text style={styles.message}>This will remove all items. Continue?</Text>
          <View style={styles.row}>
            <Pressable style={[styles.button, styles.danger]} onPress={onConfirm}>
              <Text style={{ color: 'white' }}>Continue</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.ghost]} onPress={onCancel}>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
