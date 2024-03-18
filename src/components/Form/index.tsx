import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "./style";

interface FormProps {
  onSubmit?: () => Promise<void>;
  children?: React.ReactNode;
}

export function Form({ onSubmit, children }: FormProps) {
  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit();
    }
  };

  return (
    <TouchableOpacity onPress={handleSubmit} style={styles.container}>
      {children}
    </TouchableOpacity>
  );
}
