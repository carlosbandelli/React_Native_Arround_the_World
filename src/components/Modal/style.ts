import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
  },
  divButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  customDivButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});