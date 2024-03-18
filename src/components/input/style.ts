import { StyleSheet } from 'react-native';
import { theme } from '../../theme'; // Importando o tema

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray_300,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10, // Adicionando margem inferior
    color: theme.colors.black,
  },
});