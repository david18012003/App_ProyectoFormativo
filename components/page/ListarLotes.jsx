import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import { sharedStyles } from '../../public/Colores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { IP } from './IP';
import axios from 'axios';
import ModalLotes from '../Modales/ModalLotes';

const ListarLotes = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewModal, setViewModal] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [loteData, setLoteData] = useState(null);
  const [loteId, setLoteId] = useState(null);

  const modo = async () => {
    try {
      const storedMode = await AsyncStorage.getItem('isDarkMode');
      if (storedMode !== null) {
        setIsDarkMode(JSON.parse(storedMode));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const vista = (accion, loteData = null, loteId = null) => {
    setTituloModal(accion);
    setLoteData(loteData);
    setLoteId(loteId);
    setViewModal(true); 
  };

  const ListarLote = async () => {
    try {
      const url = `http://${IP}:3000/lotes/listar`;
      const tokenAsyng = await AsyncStorage.getItem('token');
      const consulta = await axios.get(url, { headers: { token: tokenAsyng } });
      setOriginalData(consulta.data);
      setFilteredData(consulta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDesactivar = async (codigo) => {
    try {
      const url = `http://${IP}:3000/lotes/desactivar/${codigo}`;
      const tokenAsing = await AsyncStorage.getItem('token');
      const response = await axios.put(url, null, { headers: { token: tokenAsing } });
      if (response.status === 200) {
        Alert.alert(response.data.message);
        ListarLote();
      } else {
        Alert.alert('Error al desactivar el lote');
      }
    } catch (error) {
      Alert.alert('Error al desactivar el lote');
    }
  };

  const handleActivar = async (codigo) => {
    try {
      const url = `http://${IP}:3000/lotes/activar/${codigo}`;
      const tokenAsing = await AsyncStorage.getItem('token');
      const response = await axios.put(url, null, { headers: { token: tokenAsing } });
      if (response.status === 200) {
        Alert.alert(response.data.message);
        ListarLote();
      } else {
        Alert.alert('Error al activar el lote');
      }
    } catch (error) {
      Alert.alert('Error al activar el lote');
    }
  };

  useEffect(() => {
    ListarLote();
  }, []);

  useEffect(() => {
    let filteredLotes = originalData;
    if (searchTerm) {
      filteredLotes = filteredLotes.filter(lote =>
        Object.values(lote).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
    if (selectedStatus) {
      filteredLotes = filteredLotes.filter(lote => lote.estado === selectedStatus);
    }
    setFilteredData(filteredLotes);
  }, [searchTerm, selectedStatus, originalData]);

  useFocusEffect(
    React.useCallback(() => {
      modo();
    }, []),
  );

  return (
    <>
      <HeaderPrincipal title={'Lotes'} />
      <View style={[sharedStyles.container, !isDarkMode ? sharedStyles.conteinerNoche : sharedStyles.conteinerDia]}>
        <View style={sharedStyles.inputContainer}>
          <View style={sharedStyles.selectContainer}>
            <TextInput
              style={sharedStyles.input}
              placeholder="Buscar Lote"
              placeholderTextColor={'#999'}
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
            <View style={sharedStyles.pickerContainer1}>
              <RNPickerSelect
                onValueChange={value => setSelectedStatus(value)}
                placeholder={{ label: 'Estado', value: null }}
                items={[
                  { label: 'Activo', value: 'activo', key: 'activo' },
                  { label: 'Inactivo', value: 'inactivo', key: 'inactivo' },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
        </View>
        <ScrollView style={sharedStyles.scrollView}>
          {filteredData.map(item => (
            <View
              key={item.codigo}
              style={[
                sharedStyles.userContainer,
                !isDarkMode ? sharedStyles.conteinerDia : sharedStyles.conteinerNoche,
              ]}>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Código Lote:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {item.codigo}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Número de Árboles:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {item.numero_arboles}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Finca:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {item.fk_finca}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Variedad:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {item.fk_variedad}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    isDarkMode ? sharedStyles.noche : sharedStyles.dia,
                  ]}
                >
                  Estado:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    item.estado === 'activo'
                      ? sharedStyles.active
                      : sharedStyles.inactive,
                  ]}
                >
                  {item.estado}
                </Text>
              </View>
              <View style={sharedStyles.contenedorBtn}>
                <View style={sharedStyles.itemContainer}>
                  <TouchableOpacity
                  onPress={() =>
                    vista('Actualizar', item, item.codigo)
                  }
                    style={sharedStyles.button}
                  >
                    <Text style={sharedStyles.actualizar}>Actualizar</Text>
                  </TouchableOpacity>
                </View>
                <View style={sharedStyles.buttonContainerD}>
                  <TouchableOpacity
                    onPress={() =>
                        item.estado === 'activo'
                          ? handleDesactivar(item.codigo)
                          : handleActivar(item.codigo)
                      }
                    style={[
                      item.estado === 'activo'
                        ? sharedStyles.buttonD
                        : sharedStyles.buttonDa,
                    ]}
                  >
                    <Text style={sharedStyles.actualizar}>
                      {item.estado === 'activo' ? 'Desactivar' : 'Activar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={sharedStyles.addButton}>
          <TouchableOpacity onPress={() => vista('Registrar')}>
            <Image
              style={sharedStyles.addImage}
              source={require('../../assets/mas.png')}
            />
          </TouchableOpacity>
        </View>
        {viewModal && (
          <ModalLotes
            visible={viewModal}
            onClose={() => setViewModal(false)}
            title={tituloModal}
            data={loteData}
            loteId={loteId}
            ListarLote={ListarLote}
          />
        )}
      </View>
    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
});

export default ListarLotes;
