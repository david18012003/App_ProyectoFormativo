import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { IP } from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import ModalUsuario from '../Modales/ModalUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListarUsuarios = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewModal, setViewModal] = useState(false)
  const [tituloModal, setTituloModal] = useState('');
  const [userData, setUserData] = useState(null)
  const [userId, setUserId] = useState(null)


  const ip= IP

  const vista =(accion,userData, userId)=>{
    setTituloModal(accion)
    setViewModal(!viewModal)
    setUserData(userData);
    setUserId(userId);

    // console.log(userData)
}




  const fetchData = async () => {
    try {
      const baseURL = `http://${ip}:3000/usuarios/listar`;
      const tokenAsyng = await AsyncStorage.getItem('token')
      console.log("el token de listar:" + tokenAsyng)
      const response = await axios.get(baseURL ,{headers:{token:tokenAsyng}});
      const dataWithIds = response.data.usuarios.map((usuario, index) => ({
        id: index + 1, 
        identificacion: usuario.identificacion,
        nombre: usuario.nombre, 
        telefono: usuario.telefono, 
        correo_electronico:usuario.correo_electronico,
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

  useEffect(() => { fetchData(); }, [])

  useEffect(() => {
    let filteredUsers = originalData;

    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user => {
        return Object.values(user).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (selectedRole) {
      filteredUsers = filteredUsers.filter(user => user.tipo_usuario === selectedRole);
    }

    if (selectedStatus) {
      filteredUsers = filteredUsers.filter(user => user.estado === selectedStatus);
    }

    setFilteredData(filteredUsers);
  }, [searchTerm, selectedRole, selectedStatus, originalData]);
  const handleDesactivar = async (userId) => {
    try {
        console.log(userId)
        const token = await AsyncStorage.getItem('token');
        const baseURL = `http://${ip}:3000/usuarios/desactivar/${userId}`;
        const response = await axios.put(baseURL, null,{ headers: { token: token } });
        if (response.status === 201 ||response.status === 200) {
            Alert.alert('Se desactivó con éxito el Usuario');
            fetchData();
        } else {
            console.log(response.status)
            Alert.alert('Error');
        }
    } catch (error) {
      console.error(error)
    }
  };

  const handleActivar = async (userId) => {
    try {
        console.log(userId)
        const token = await AsyncStorage.getItem('token');
        const baseURL = `http://${ip}:3000/usuarios/activar/${userId}`;
        const response = await axios.put(baseURL, null,{ headers: { token: token } });
        if (response.status === 201 || response.status===200) {
            Alert.alert('Se Activó con éxito el Usuario');
            fetchData();
        } else {
            console.log(response.status)
            Alert.alert('Error');
        }
    } catch (error) {
      console.error(error)
    }
  };

  // console.log(userData)
  return (
    <>
        <HeaderPrincipal title=' Usuarios' />
      <View style={styles.container}>
        
        <View style={styles.inputContainer}>
          
        <View style={styles.selectContainer}>
  <TextInput
    style={styles.input}
    placeholderTextColor="#999"
    placeholder="Buscar usuario"
    onChangeText={setSearchTerm}
    value={searchTerm}
  />
  <View style={styles.pickerContainer}>
    <RNPickerSelect
      onValueChange={(value) => setSelectedRole(value)}
      placeholder={{ label: "Rol", value: null }}
      items={[
        { label: 'Catador', value: 'catador' },
        { label: 'Caficultor', value: 'caficultor' },
      ]}
      style={pickerSelectStyles}
      useNativeAndroidPickerStyle={false}
    />
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
        {filteredData.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.key}>Identificacion:</Text>
              <Text style={[styles.value, {color:'#000'}]}>{user.identificacion}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.key}>Nombre:</Text>
              <Text style={[styles.value, {color:'#000'}]}>{user.nombre}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.key}>Teléfono:</Text>
              <Text style={[styles.value, {color:'#000'}]}>{user.telefono}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.key}>Tipo de usuario:</Text>
              <Text style={[styles.value, {color:'#000'}]}>{user.tipo_usuario}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.key}>Estado:</Text>
              <Text style={[styles.value, user.estado === 'activo' ? styles.active : styles.inactive]}>{user.estado}</Text>
            </View>
            <View style={styles.contenedorBtn}>
            <View style={styles.itemContainer}>
            <TouchableOpacity onPress={()=>vista('Actualizar',user,user.identificacion)} style={styles.button}>
              <Text style={styles.actualizar}>Actualizar</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainerD}>
            <TouchableOpacity onPress={()=> user.estado === 'activo' ? handleDesactivar(user.identificacion) : handleActivar(user.identificacion)} style={[user.estado === 'activo'?styles.buttonD:styles.buttonDa]}>
              <Text style={styles.actualizar}>{user.estado === 'activo' ? 'Desactivar' : 'Activar'}</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        ))}
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor:"#336699", borderRadius:50, height:40, width:40, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={()=>vista('Registrar')}>
            <Text style={{ fontSize: 24, textAlign: 'center', color: '#ffffff' }}>+</Text>
          </TouchableOpacity>
        </View>
        <ModalUsuario visible={viewModal} onClose={vista} title={tituloModal} data={fetchData} userData={userData} userId={userId}/>


      </View>
    </>
  );
};
const styles = StyleSheet.create({
  active: {
    color: 'green', // Cambia el color para el estado activo según tus preferencias
  },
  inactive: {
    color: 'red', // Cambia el color para el estado inactivo según tus preferencias
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
    // flex: 1,  // por culpa de este flex no me funcionaba los select
    // maxWidth: 800,
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


export default ListarUsuarios;
