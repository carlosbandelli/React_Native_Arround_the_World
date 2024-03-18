import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 8,
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  text: {
    fontSize: 16,
  },
  flag: {
    width: 40,
    height: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
});