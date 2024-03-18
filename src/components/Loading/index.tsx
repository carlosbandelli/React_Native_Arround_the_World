import React from "react";
import { View } from "react-native";
import { icons } from "lucide-react";
import { styles } from "./style"; // Importando os estilos do arquivo style.ts

interface LoadingProps {
  iconName?: keyof typeof icons;
  iconSize?: number;
  iconColor?: string;
  iconClassName?: string;
}

export const Loading = ({ iconName, iconSize }: LoadingProps) => {
  const defaultIconClassName = "text-gray-500 animate-spin";
  const LucideIcon = iconName ? icons[iconName] : undefined;
  return (
    <View style={styles.container}>
      {LucideIcon && <LucideIcon size={iconSize} />}
    </View>
  );
};
