import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { icons } from "lucide-react";
import { styles } from "./style";

interface ButtonProps {
  text: string;
  onPress?: () => void;
}

export function Button({ text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
