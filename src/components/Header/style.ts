import { StyleSheet } from 'react-native';
import { theme } from '../../theme'; // Importando o tema

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Adicionando margem inferior
  },
  title: {
    textAlign: 'center',
    fontSize: theme.fonts.size.heading.xl,
    fontFamily: theme.fonts.family.bold,
    color: theme.colors.gray_200,
    lineHeight: 44,
    marginTop: 42,
  },
});