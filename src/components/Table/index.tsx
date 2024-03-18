import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal as RNModal,
  ScrollView,
} from "react-native";
import { CountryData } from "../../Types/types";
import { TableResponse } from "../TableResponse";
import { styles } from "./style";

interface TableProps {
  countries: CountryData[];
  onExecuteAgain: (countryName: string, showModal: boolean) => void;
  openGoogleMapsLink: (link: string) => void;
}

export function Table({
  countries,
  onExecuteAgain,
  openGoogleMapsLink,
}: TableProps) {
  const [showModal, setShowModal] = useState(false);
  const [countryName, setCountryName] = useState("");

  const handleExecuteAgain = (countryName: string, showModal: boolean) => {
    setCountryName(countryName);
    setShowModal(showModal);
  };

  const handleConfirmExecuteAgain = () => {
    onExecuteAgain(countryName, false);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Bandeira</Text>
            <Text style={styles.tableHeader}>Nome Oficial</Text>
            <Text style={styles.tableHeader}>Nome Comum</Text>
            <Text style={styles.tableHeader}>População</Text>
            <Text style={styles.tableHeader}>Capital</Text>
            <Text style={styles.tableHeader}>Moeda internacional</Text>
            <Text style={styles.tableHeader}>Moeda nacional</Text>
            <Text style={styles.tableHeader}>Simbolo</Text>
            <Text style={styles.tableHeader}>Executar Novamente</Text>
            <Text style={styles.tableHeader}>Abrir no Google Maps</Text>
          </View>
          {countries.map((country: CountryData) => (
            <TableResponse
              key={country.index}
              country={country}
              onExecuteAgain={handleExecuteAgain}
              openGoogleMapsLink={openGoogleMapsLink}
            />
          ))}
        </View>
      </ScrollView>
      <RNModal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Executar Novamente?</Text>
            <Text style={styles.modalBody}>
              Quando você executa novamente, vai renderizar o mesmo país na tela
              para você. Deseja Executar novamente?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmExecuteAgain}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNModal>
    </View>
  );
}
