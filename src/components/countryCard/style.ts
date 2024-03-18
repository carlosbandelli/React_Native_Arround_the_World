import { StyleSheet } from "react-native";
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    backgroundColor: theme.colors.white,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
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
  actionButton: {
    marginTop: 8,
  },
});