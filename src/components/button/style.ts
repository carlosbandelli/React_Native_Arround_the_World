import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.green_600,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickable: {
    opacity: 0.8,
  },
  text: {
    color: theme.colors.white,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
    marginLeft: 5,
  },
});