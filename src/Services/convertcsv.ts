import React, { useState } from 'react';
import { View } from 'react-native';
import * as XLSX from 'xlsx';
import { Button } from '../components/button';
import { Modal } from '../components/Modal';
import { StyleSheet } from 'react-native';

interface ExportCSVButtonProps {
  searchHistory: any[];
}

export function ExportCSVButton({ searchHistory }: ExportCSVButtonProps) {
  const [showEmptyListModal, setShowEmptyListModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCancelEmptyListModal = () => {
    setShowEmptyListModal(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const convertToCSV = () => {
    if (!searchHistory || searchHistory.length === 0) {
      setShowEmptyListModal(true);
      return '';
    }

    const columns = [
      { label: 'Index', key: 'index' },
      { label: 'Bandeira', key: 'flags.png' },
      { label: 'Nome oficial', key: 'translations.por.official' },
      { label: 'Nome Comum', key: 'translations.por.common' },
      { label: 'População', key: 'population' },
      { label: 'Capital', key: 'capital[0]' },
      { label: 'Moeda internacional', key: 'currenciesKey' },
      { label: 'Moeda nacional', key: 'currencies.name' },
      { label: 'Símbolo', key: 'currencies.symbol' },
      { label: 'Idioma', key: 'languages' },
      { label: 'Abrir no Google Maps', key: 'maps.googleMaps' },
    ];

    const excelData = searchHistory.map(country => {
      const countryData: any = {};

      columns.forEach(column => {
        const keys = column.key.split('.');
        let value = country;

        keys.forEach(key => {
          if (value && value[key] !== undefined) {
            value = value[key];
          } else {
            value = undefined;
          }
        });

        switch (column.key) {
          case 'flags.png':
            countryData[column.label] = country.flags && country.flags.png;
            break;
          case 'translations.por.official':
            countryData[column.label] = country.translations && country.translations.por && country.translations.por.official;
            break;
          case 'translations.por.common':
            countryData[column.label] = country.translations && country.translations.por && country.translations.por.common;
            break;
          case 'capital[0]':
            countryData[column.label] = country.capital && country.capital[0];
            break;
          case 'currenciesKey':
            countryData[column.label] = country.currencies && Object.keys(country.currencies)[0];
            break;
          case 'currencies.name':
            countryData[column.label] = country.currencies && country.currencies[Object.keys(country.currencies)[0]].name;
            break;
          case 'currencies.symbol':
            countryData[column.label] = country.currencies && country.currencies[Object.keys(country.currencies)[0]].symbol;
            break;
          case 'languages':
            countryData[column.label] = country.languages && country.languages[Object.keys(country.languages)[0]];
            break;
          case 'maps.googleMaps':
            countryData[column.label] = country.maps && country.maps.googleMaps;
            break;
          case 'index':
            countryData[column.label] = country.index && country.index;
            break;
          default:
            countryData[column.label] = value;
            break;
        }
      });

      return countryData;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData, { header: columns.map(column => column.label) });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    XLSX.writeFile(workbook, 'countries.xlsx');
    setShowSuccessModal(true);
  };

  return
}

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#32CD32', // Lime Green
    borderRadius: 8,
    marginBottom: 8,
  },
  emptyModal: {
    backgroundColor: '#FFD700', // Gold
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successModal: {
    backgroundColor: '#008000', // Green
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});