import useShoppingStore from '@/store/useShoppingStore';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

type Props = { dark: boolean; setDark: (v: boolean) => void };

export default function ThemeToggle() {
  const theme = useShoppingStore(state => state.theme);
  return (
    <View style={styles.row}>
      <Text style={[styles.label, theme === 'dark' ? { color: '#fff' } : { color: '#000' }]}>{theme === 'dark' ? 'Dark' : 'Light'}</Text>
      <Switch value={theme === 'dark'} onValueChange={(value) => useShoppingStore.setState({ theme: value ? 'dark' : 'light' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontWeight: '600' },
});
