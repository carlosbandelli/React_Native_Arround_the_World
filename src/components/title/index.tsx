import React from "react";
import { Text, StyleSheet } from "react-native";
import { styles } from "./style";

interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}
