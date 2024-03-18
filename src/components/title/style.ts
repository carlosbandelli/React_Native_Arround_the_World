import { StyleSheet } from 'react-native';
import { theme } from '../../theme'; // Importando o tema

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: theme.fonts.family.bold,
    marginBottom: 10,
  },
});