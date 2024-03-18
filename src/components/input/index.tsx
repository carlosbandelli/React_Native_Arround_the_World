import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export function Input({
  value,
  placeholder = "Digite o nome do país",
  onChange,
}: InputProps) {
  return (
    <TextInput
      style={inputStyles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      keyboardType="default"
    />
  );
}

const inputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
  },
});
