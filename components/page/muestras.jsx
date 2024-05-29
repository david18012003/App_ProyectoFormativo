import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { IP } from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMuestra from '../Modales/ModalMuestras';
import { sharedStyles } from '../../public/Colores';
import { useFocusEffect } from '@react-navigation/native';


const Muestras = () => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [viewModal, setViewModal] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isDarkMode ,setIsDarkMode] =useState(false)

    const mode = async()=>{
      try {
        const storedMode = await AsyncStorage.getItem('isDarkMode')
        if (storedMode !== null) {
          setIsDarkMode(JSON.parse(storedMode))
        }
      } catch (error) {
        console.log(error)
      }
    }
    useFocusEffect(
      React.useCallback(() => {
        mode();
      }, [])
    );
    const ip = IP;
  
    const vista = (accion, userData, userId) => {
      setTituloModal(accion);
      setViewModal(!viewModal);
      setUserData(userData);
      setUserId(userId);
    };
  
    const fetchData = async () => {
      try {
        const baseURL = `http://${ip}:3000/muestras/listarMuestra`;
        const tokenAsyng = await AsyncStorage.getItem('token');
        const response = await axios.get(baseURL, { headers: { token: tokenAsyng } });
        console.log(response.data);
        if (response.data && response.data.length > 0) {
            console.log('datos cargados con exito');
        } else {
            console.log('La respuesta está vacía o no es un arreglo válido');
        }
        const dataWithIds = response.data.map((muestra, index) => ({
          codigo: index + 1,
          codigo: muestra.codigo,
          fecha: formatDate(muestra.fecha), 
          cantidad: muestra.cantidad,
          quien_recibe: muestra.quien_recibe,
          proceso_fermentacion: muestra.proceso_fermentacion,
          humedad_cafe: muestra.humedad_cafe,
          altura_MSNM: muestra.altura_MSNM,
          tipo_secado: muestra.tipo_secado,
          observaciones: muestra.observaciones,
          fk_lote: muestra.fk_lote,
          estado: muestra.estado,
        }));
        
        setOriginalData(dataWithIds);
        setFilteredData(dataWithIds);

      } catch (error) {
        console.error('Error al obtener datos:', error.message);
      }
    };
      // Función para formatear la fecha
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };
      
    useEffect(() => { fetchData(); }, []);
  
    useEffect(() => {
      let filteredmuestras = originalData;
  
      if (searchTerm) {
        filteredmuestras = filteredmuestras.filter(muestra =>
          Object.values(muestra).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
  
      if (selectedStatus) {
        filteredmuestras = filteredmuestras.filter(muestra => muestra.estado === selectedStatus);
      }
  
      setFilteredData(filteredmuestras);
    }, [searchTerm, selectedRole, selectedStatus, originalData]);
  
    const handleDesactivar = async (userId) => {
      try {
          const token = await AsyncStorage.getItem('token');
          const baseURL = `http://${ip}:3000/muestras/desactivarMuestra/${userId}`;
          const response = await axios.put(baseURL, null, { headers: { token: token } });
  
          if (response.status === 200) {
              const mensaje = response.data.message;
              Alert.alert(mensaje);
              fetchData();
          } else {
              console.error('Error:', response.status);
              Alert.alert('Error al desactivar la muestra');
          }
      } catch (error) {
          console.error(error);
          Alert.alert('Error al desactivar la muestra');
      }
  };
  const handleActivar = async (userId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const baseURL = `http://${ip}:3000/muestras/activarMuestra/${userId}`;
        const response = await axios.put(baseURL, null, { headers: { token: token } });

        if (response.status === 200) {
            const mensaje = response.data.message;
            Alert.alert(mensaje);
            fetchData();
        } else {
            console.error('Error:', response.status);
            Alert.alert('Error al activar la muestra');
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error al activar la muestra');
    }
};
  
  
  
    return (
      <>
        <HeaderPrincipal title='Muestras' />
        <View style={[sharedStyles.container, !isDarkMode ? sharedStyles.conteinerNoche : sharedStyles.conteinerDia]}>
          <View style={sharedStyles.inputContainer}>
            <View style={sharedStyles.selectContainer}>
              <TextInput
                style={sharedStyles.input}
                placeholderTextColor="#999"
                placeholder="Buscar muestra"
                onChangeText={setSearchTerm}
                value={searchTerm}
              />
              <View style={sharedStyles.pickerContainer1}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedStatus(value)}
                  placeholder={{ label: "Estado", value: null }}
                  items={[
                    { label: 'Activo', value: 'activo' },
                    { label: 'Inactivo', value: 'inactivo' },
                  ]}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
            </View>
          </View>
          <ScrollView style={sharedStyles.scrollView}>
            {filteredData.map((muestra) => (
              <View key={muestra.codigo} style={[sharedStyles.userContainer, !isDarkMode ? sharedStyles.conteinerDia : sharedStyles.conteinerNoche]}>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Código muestra:</Text>          
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.codigo}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>fecha:</Text>
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.fecha}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>cantidad</Text>
                  <Text  style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.cantidad}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Quien recibe:</Text>
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.quien_recibe}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Proceso de fermentación</Text>
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.proceso_fermentacion}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>humedad del cafe </Text>
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.humedad_cafe}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Altura en MSNM</Text>
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.altura_MSNM}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Tipo de secado</Text>
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.tipo_secado}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Observaciones</Text>
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.observaciones}</Text>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Numero de lote</Text>
                  <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{muestra.fk_lote}</Text>
                </View>

                <View style={sharedStyles.itemContainer}>
                  <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Estado:</Text>
                  <Text style={[sharedStyles.value, muestra.estado === 'activo' ? sharedStyles.active : sharedStyles.inactive]}>
                    {muestra.estado}
                  </Text>
                </View>
                <View style={sharedStyles.contenedorBtn}>
                  <View style={sharedStyles.itemContainer}>
                    <TouchableOpacity onPress={() => vista('Actualizar', muestra, muestra.codigo)} style={sharedStyles.button}>
                      <Text style={sharedStyles.actualizar}>Actualizar</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={sharedStyles.buttonContainerD}>
                    <TouchableOpacity onPress={() => muestra.estado === 'activo' ? handleDesactivar(muestra.codigo) : handleActivar(muestra.codigo)} style={muestra.estado === 'activo' ? sharedStyles.buttonD : sharedStyles.buttonDa}>
                      <Text style={sharedStyles.actualizar}>{muestra.estado === 'activo' ? 'Desactivar' : 'Activar'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={sharedStyles.addButton}>
            <TouchableOpacity onPress={() => vista('Registrar')}>
              <Image style={sharedStyles.addImage} source={require('../../assets/mas.png')} />
            </TouchableOpacity>
          </View>
          <ModalMuestra visible={viewModal} onClose={vista} title={tituloModal} data={fetchData} userData={userData} userId={userId} />
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
    borderRadius: 10, // Redondea las esquinas del select
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
    borderRadius: 10, // Redondea las esquinas del select
    color: '#fff',
    backgroundColor: '#A3DBEE',
    marginBottom: 5,
    marginRight: 8,
  },
  placeholder: {
    color: '#000', // Color del texto del placeholder
    fontSize: 14,
    paddingHorizontal: 10,
  },
});


export default Muestras;
