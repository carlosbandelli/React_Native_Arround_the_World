import { StyleSheet } from "react-native"

export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  green_100: "#DCFCE7",
  green_600: "#15803D",
  yellow_500: "#EFB103",
  gray_200: "#C4C4CC",
  gray_300: "#8D8D99",
  gray_400: "#7C7C8A",
};

export const fonts = {
  family: {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    bold: "Poppins_700Bold",
  },
  size: {
    body: {
      xs: 12,
      sm: 14,
      md: 16,
    },
    heading: {
      xs: 16,
      sm: 18,
      md: 20,
      lg: 24,
      xl: 36,
    },
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.black,
  },
  main: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray_300,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.black,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.green_600,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  viewModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewModeIconsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  icon: {
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
  },
})