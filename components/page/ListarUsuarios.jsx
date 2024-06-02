import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import {IP} from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import ModalUsuario from '../Modales/ModalUsuario';
import ModalInternet from '../Modales/ModalInternet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import PDFGenerator from '../generadorPDF/PDFCreator';
import {colores, sharedStyles} from '../../public/Colores';
import {useFocusEffect} from '@react-navigation/native';

const ListarUsuarios = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewModal, setViewModal] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [internetModal, setInternetModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const ip = IP;

  const vista = (accion, userData, userId) => {
    setTituloModal(accion);
    setViewModal(!viewModal);
    setUserData(userData);
    setUserId(userId);

    // console.log(userData)
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Tipo de conexion', state.type);
      console.log('Is conected??', state.isConnected);
      if (!state.isConnected) {
        setInternetModal(true);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    try {
      const baseURL = `http://${ip}:3000/usuarios/listar`;
      const tokenAsyng = await AsyncStorage.getItem('token');
      console.log('el token de listar:' + tokenAsyng);
      const response = await axios.get(baseURL, {headers: {token: tokenAsyng}});
      const dataWithIds = response.data.usuarios.map((usuario, index) => ({
        id: index + 1,
        identificacion: usuario.identificacion,
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        correo_electronico: usuario.correo_electronico,
        password: usuario.password,
        tipo_usuario: usuario.tipo_usuario,
        estado: usuario.estado,
      }));
      setOriginalData(dataWithIds);
      setFilteredData(dataWithIds);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado HTTP fuera del rango 2xx
        console.error('Error al obtener datos:', error.response.statusText);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió ninguna respuesta
        console.error('Error al realizar la solicitud:', error.request);
      } else {
        // Ocurrió un error al configurar o procesar la solicitud
        console.error('Error inesperado:', error.message);
      }
    }
  };

  const mode = async () => {
    try {
      const storedMode = await AsyncStorage.getItem('isDarkMode');
      if (storedMode !== null) {
        setIsDarkMode(JSON.parse(storedMode));
        console.log('Modo ', isDarkMode);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      mode();
    }, [isDarkMode]),
  );

  useEffect(() => {
    let filteredUsers = originalData;

    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user => {
        return Object.values(user).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        );
      });
    }

    if (selectedRole) {
      filteredUsers = filteredUsers.filter(
        user => user.tipo_usuario === selectedRole,
      );
    }

    if (selectedStatus) {
      filteredUsers = filteredUsers.filter(
        user => user.estado === selectedStatus,
      );
    }

    setFilteredData(filteredUsers);
  }, [searchTerm, selectedRole, selectedStatus, originalData]);
  const handleDesactivar = async userId => {
    try {
      console.log(userId);
      const token = await AsyncStorage.getItem('token');
      const baseURL = `http://${ip}:3000/usuarios/desactivar/${userId}`;
      const response = await axios.put(baseURL, null, {
        headers: {token: token},
      });
      if (response.status === 201 || response.status === 200) {
        Alert.alert('Se desactivó con éxito el Usuario');
        fetchData();
      } else {
        console.log(response.status);
        Alert.alert('Error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivar = async userId => {
    try {
      console.log(userId);
      const token = await AsyncStorage.getItem('token');
      const baseURL = `http://${ip}:3000/usuarios/activar/${userId}`;
      const response = await axios.put(baseURL, null, {
        headers: {token: token},
      });
      if (response.status === 201 || response.status === 200) {
        Alert.alert('Se Activó con éxito el Usuario');
        fetchData();
      } else {
        console.log(response.status);
        Alert.alert('Error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(userData)
  return (
    <>
      <HeaderPrincipal title=" Usuarios" />
      <View
        style={[
          sharedStyles.container,
          !isDarkMode ? sharedStyles.conteinerNoche : sharedStyles.conteinerDia,
        ]}>
        <View style={sharedStyles.inputContainer}>
          <View style={sharedStyles.selectContainer}>
            <TextInput
              style={sharedStyles.input}
              placeholderTextColor="#999"
              placeholder="Buscar usuario"
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
            <View style={sharedStyles.pickerContainer}>
              <RNPickerSelect
                onValueChange={value => setSelectedRole(value)}
                placeholder={{label: 'Rol', value: null}}
                items={[
                  {label: 'Catador', value: 'catador'},
                  {label: 'Caficultor', value: 'caficultor'},
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <View style={sharedStyles.pickerContainer}>
              <RNPickerSelect
                onValueChange={value => setSelectedStatus(value)}
                placeholder={{label: 'Estado', value: null}}
                items={[
                  {label: 'Activo', value: 'activo'},
                  {label: 'Inactivo', value: 'inactivo'},
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
        </View>
        <ScrollView style={sharedStyles.scrollView}>
          {filteredData.map(user => (
            <View
              key={user.id}
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
                  Identificacion:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {user.identificacion}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Nombre:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {user.nombre}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Teléfono:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {user.telefono}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Tipo de usuario:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  {user.tipo_usuario}
                </Text>
              </View>
              <View style={sharedStyles.itemContainer}>
                <Text
                  style={[
                    sharedStyles.key,
                    !isDarkMode ? sharedStyles.dia : sharedStyles.noche,
                  ]}>
                  Estado:
                </Text>
                <Text
                  style={[
                    sharedStyles.value,
                    user.estado === 'activo'
                      ? sharedStyles.active
                      : sharedStyles.inactive,
                  ]}>
                  {user.estado}
                </Text>
              </View>
              <View style={sharedStyles.contenedorBtn}>
                <View style={sharedStyles.itemContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      vista('Actualizar', user, user.identificacion)
                    }
                    style={sharedStyles.button}>
                    <Text style={sharedStyles.actualizar}>Actualizar</Text>
                  </TouchableOpacity>
                </View>
                <View style={sharedStyles.buttonContainerD}>
                  <TouchableOpacity
                    onPress={() =>
                      user.estado === 'activo'
                        ? handleDesactivar(user.identificacion)
                        : handleActivar(user.identificacion)
                    }
                    style={[
                      user.estado === 'activo'
                        ? sharedStyles.buttonD
                        : sharedStyles.buttonDa,
                    ]}>
                    <Text style={sharedStyles.actualizar}>
                      {user.estado === 'activo' ? 'Desactivar' : 'Activar'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={sharedStyles.itemContainer}>
                  <PDFGenerator />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={sharedStyles.addButton}>
          <TouchableOpacity onPress={() => vista('Registrar')}>
            <Image
              source={require('../../assets/mas.png')}
              style={sharedStyles.addImage}
            />
          </TouchableOpacity>
        </View>
        <ModalInternet
          visible={internetModal}
          onClose={() => setInternetModal(false)}
        />
        <ModalUsuario
          visible={viewModal}
          onClose={vista}
          title={tituloModal}
          data={fetchData}
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

export default ListarUsuarios;
