import { StyleSheet } from "react-native";
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: theme.fonts.size.heading.md,
    marginBottom: 8,
  },
  infoText: {
    fontSize: theme.fonts.size.body.sm,
    color: theme.colors.white,
    marginBottom: 4,
  },
  card: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
});
