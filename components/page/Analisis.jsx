import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { IP } from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAnalisis from '../Modales/ModalAnalisis';


const Analisis = () => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [viewModal, setViewModal] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);

    const ip = IP;
  
    const vista = (accion, userData, userId) => {
      setTituloModal(accion);
      setViewModal(!viewModal);
      setUserData(userData);
      setUserId(userId);
    };
  
    const fetchData = async () => {
      try {
        const baseURL = `http://${ip}:3000/analisis/listar`;
        const tokenAsyng = await AsyncStorage.getItem('token');
        const response = await axios.get(baseURL, { headers: { token: tokenAsyng } });
        console.log(response.data);
        if (response.data && response.data.length > 0) {
            console.log('datos cargados con exito');
        } else {
            console.log('La respuesta está vacía o no es un arreglo válido');
        }
        const dataWithIds = response.data.map((analisis, index) => ({
          codigo: index + 1,
          codigo: analisis.codigo,
          fecha: formatDate(analisis.fecha), 
          analista: analisis.analista,
          muestra: analisis.muestra,
          tipo_analisis: analisis.tipo_analisis,
          estado: analisis.estado
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
  
    const handleDesactivar = async (codigoId) => {
      try {
          const token = await AsyncStorage.getItem('token');
          const baseURL = `http://${ip}:3000/analisis/desactivar/${codigoId}`;
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
  
  const handleActivar = async (codigoId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const baseURL = `http://${ip}:3000/analisis/activar/${codigoId}`;
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
          Alert.alert('Error al desactivar la muestra');
    }
  }
  
  
    return (
      <>
        <HeaderPrincipal title='Analisis' />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.selectContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#999"
                placeholder="Buscar muestra"
                onChangeText={setSearchTerm}
                value={searchTerm}
              />
              <View style={styles.pickerContainer}>
              </View>
              <View style={styles.pickerContainer}>
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
          <ScrollView style={styles.scrollView}>
            {filteredData.map((analisis) => (
              <View key={analisis.codigo} style={styles.userContainer}>
                <View style={styles.itemContainer}>
                  <Text style={styles.key}>Código muestra:</Text>          
                  <Text style={[styles.value, { color: '#000' }]}>{analisis.codigo}</Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text style={styles.key}>fecha:</Text>
                  <Text style={[styles.value, { color: '#000' }]}>{analisis.fecha}</Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text style={styles.key}>Analista</Text>
                  <Text  style={[styles.value, { color: '#000' }]}>{analisis.analista}</Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text style={styles.key}>Muestra:</Text>
                  <Text style={[styles.value, { color: '#000' }]}>{analisis.muestra}</Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text style={styles.key}>Tipo Analisis</Text>
                  <Text style={[styles.value, { color: '#000' }]}>{analisis.tipo_analisis}</Text>
                </View>

                <View style={styles.itemContainer}>
                  <Text style={styles.key}>Estado:</Text>
                  <Text style={[styles.value, analisis.estado === 'activo' ? styles.active : styles.inactive]}>
                    {analisis.estado}
                  </Text>
                </View>
                <View style={styles.contenedorBtn}>
                  <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => vista('Actualizar', analisis, analisis.codigo)} style={styles.button}>
                      <Text style={styles.actualizar}>Actualizar</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainerD}>
                    <TouchableOpacity onPress={() => analisis.estado === 'activo' ? handleDesactivar(analisis.codigo):handleActivar(analisis.codigo)} style={analisis.estado === 'activo' ? styles.buttonD : styles.buttonDa}>
                      <Text style={styles.actualizar}>{analisis.estado === 'activo' ? 'Desactivar' : 'Activar'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.addButton}>
            <TouchableOpacity onPress={() => vista('Registrar')}>
              <Image source={require('../../assets/mas.png')} style={styles.addButtonText}/>
            </TouchableOpacity>
          </View>
          <ModalAnalisis visible={viewModal} onClose={vista} title={tituloModal} data={fetchData} userData={userData} userId={userId} />
        </View>
      </>
    );
  };
const styles = StyleSheet.create({
  active: {
    color: 'green', 
  },
  inactive: {
    color: 'red', 
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  userContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#d4d4d4',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    color: "#000",
  },
  buttonContainerD: {
    alignContent:'flex-end',
    margin:10,
  },
  key: {
    fontWeight: 'bold',
    marginRight: 5,
    color: "#000",
  },
  value: {},
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    // marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
    color: "#000",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#9c9c9c',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#000'
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 8,
    height: 40,
    borderColor: '#9c9c9c',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0083FF',
    color: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  actualizar: {
    color: "#fff",
  },
  contenedorBtn:{
    flexDirection:'row',
  },
  buttonD: {
    backgroundColor: '#FF3200',
    // color: "#999",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDa: {
    backgroundColor: '#039B1E',
    // color: "#999",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20, 
    backgroundColor:"#336699", 
    borderRadius:50, 
    height:40, 
    width:40, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  addButtonText: {
    width:50,
    height:50,
  }
});
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


export default Analisis;
