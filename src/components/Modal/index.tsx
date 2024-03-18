import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "../button";
import { styles } from "./style";

interface ModalProps {
  title: string;
  body: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  textButton1?: string;
  textButton2?: string;
  divButton?: string;
}

export function Modal({
  title,
  body,
  onCancel,
  onConfirm,
  textButton1,
  textButton2,
}: ModalProps) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        <View>
          <Button text={textButton1 || ""} onPress={onCancel} />
          <Button text={textButton2 || ""} onPress={onConfirm} />
        </View>
      </View>
    </View>
  );
}
