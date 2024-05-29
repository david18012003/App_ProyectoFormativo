import {View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import {sharedStyles} from '../../public/Colores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {IP} from './IP';
import axios from 'axios';
import ModalFincas from '../Modales/ModalFincas';



const ListarFincas = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewModal, setViewModal] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [TipoAnalisisOptions, SetTipoAnalisiOptions] = useState([]);

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
  const vista = (accion, userData, userId) => {
    setTituloModal(accion);
    setViewModal(!viewModal);
    setUserData(userData);
    setUserId(userId);
  };

  const ListarFinca = async () => {
    try {
      const url = `http://${IP}:3000/fincas/listar`;
      const tokenAsyng = await AsyncStorage.getItem('token');
      const consulta = await axios.get(url, {headers: {token: tokenAsyng}});
      setFilteredData(consulta.data);
    } catch (error) {}
  };
  const handleDesactivar = async(codigo)=>{
    try {
        const url = `http://${IP}:3000/fincas/desactivar/${codigo}`
        const tokenAsing = await AsyncStorage.getItem('token')
        const response = await axios.put(url,null,{headers:{token:tokenAsing}})
        if (response.status === 200) {
            const mensaje = response.data.message;
            console.log('Ente es el mensaje', mensaje);
            Alert.alert(mensaje);
            ListarFinca();
          } else {
            console.error('Error:', response.status);
            Alert.alert('Error al desactivar la Finca');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error al desactivar la Finca');
        }
  }
  const handleActivar = async(codigo)=>{
    try {
        const url = `http://${IP}:3000/fincas/activar/${codigo}`
        const tokenAsing = await AsyncStorage.getItem('token')
        const response = await axios.put(url,null,{headers:{token:tokenAsing}})
        if (response.status === 200) {
            const mensaje = response.data.message;
            console.log('Ente es el mensaje', mensaje);
            Alert.alert(mensaje);
            ListarFinca();
          } else {
            console.error('Error:', response.status);
            Alert.alert('Error al activar la Finca');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error al activar la Finca');
        }
  }
  useEffect(() => {
    ListarFinca();
  }, []);
  useEffect(() => {
    let filteredFincas = originalData;

    if (searchTerm) {
      filteredFincas = filteredFincas.filter(Finca =>
        Object.values(Finca).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    if (selectedStatus) {
      filteredFincas = filteredFincas.filter(
        Finca => Finca.estado === selectedStatus,
      );
    }

    setFilteredData(filteredFincas);
  }, [searchTerm, selectedTipo, selectedStatus, originalData]);
  useFocusEffect(
    React.useCallback(() => {
      modo();
    }, []),
  );
  return (
    <>
      <HeaderPrincipal title={'Fincas'} />
      <View
        style={[
          sharedStyles.container,
          !isDarkMode ? sharedStyles.conteinerNoche : sharedStyles.conteinerDia,
        ]}>
        <View style={sharedStyles.inputContainer}>
          <View style={sharedStyles.selectContainer}>
            <TextInput
              style={sharedStyles.input}
              placeholder="Buscar Finca"
              placeholderTextColor={'#999'}
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
            <View style={sharedStyles.pickerContainer1}>
              <RNPickerSelect
                onValueChange={value => setSelectedStatus(value)}
                placeholder={{label: 'Estado', value: null}}
                items={[
                  {label: 'Activo', value: 'activo', key: 'activo'},
                  {label: 'Inactivo', value: 'inactivo', key: 'inactivo'},
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
                !isDarkMode
                  ? sharedStyles.conteinerDia
                  : sharedStyles.conteinerNoche,
              ]}>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Código Finca:
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
                  Dimension mt2:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {item.dimension_mt2}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Caficultor:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {item.fk_caficultor}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Municipio:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {item.municipio}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Vereda:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {item.vereda}
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
        <ModalFincas
        visible={viewModal}
        onClose={vista}
        title={tituloModal}
        data={ListarFinca}
        userData={userData}
        userId={userId}
        />
      </View>
    </>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#9c9c9c',
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginRight: 10,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#9c9c9c',
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#A3DBEE',
    marginBottom: 5,
    marginRight: 8,
  },
  placeholder: {
    color: '#000',
    fontSize: 14,
    paddingHorizontal: 10,
  },
});

export default ListarFincas;
