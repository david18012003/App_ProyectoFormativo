import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import { IP } from './IP';
import axios from 'axios';

const Perfil = () => {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    telefono: '',
    correo_electronico: '',
    password: '',
    tipo_usuario: '',
  });
  
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          const user = JSON.parse(storedUser);
          setFormData(user);
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario desde AsyncStorage:', error);
      }
    };

    cargarDatosUsuario();
  }, []); 
  
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
 const ip = IP
  const handleSubmit = async() => {
    const storedUser = await AsyncStorage.getItem('user')
    const user = JSON.parse(storedUser)
    const userId= user.identificacion
    console.log(userId)
    
    try {
      console.log(userId)
      const token = await AsyncStorage.getItem('token');
      const baseURL = `http://${ip}:3000/usuarios/actualizar/${userId}`;
      const response = await axios.put(baseURL, formData,{ headers: { token: token } });
      if (response.status === 201 || response.status===200) {
          Alert.alert('Se Actualizo con éxito su informacion personal');
      } else {
          console.log(response.status)
          Alert.alert('Error');
      }
  } catch (error) {
    console.error(error)
  }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require('../../assets/fondoPantallaPerfil.jpg')} 
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <Image
              source={require('../../assets/avatar.png')} 
              style={styles.avatar}
            />
            <Text style={styles.headerText}>Bienvenido:</Text>
            <Text style={styles.nombre}>{formData.nombre}</Text>
          </View>
          <View style={styles.profileHeader}>
            <Text style={styles.editText}>Editar Perfil</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.textForm}>Identificacion:</Text>
            <TextInput
              style={styles.input}
              placeholder="Identificación"
              value={formData.identificacion.toString()}
              onChangeText={(text) => handleChange('identificacion', text)}
            />
            <Text style={styles.textForm}>Nombre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formData.nombre}
              onChangeText={(text) => handleChange('nombre', text)}
            />
            <Text style={styles.textForm}>Telefono:</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={formData.telefono}
              onChangeText={(text) => handleChange('telefono', text)}
            />
            <Text style={styles.textForm}>Correo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={formData.correo_electronico}
              onChangeText={(text) => handleChange('correo_electronico', text)}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              secureTextEntry
            /> */}
            
            <Text style={styles.textForm}>Tipo usuario:</Text>
            <Text style={styles.input}>{formData.tipo_usuario}</Text>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  editText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#000', 
  },
  submitButton: {
    backgroundColor: '#336699',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textForm:{
    fontSize:20,
    color:"#fff"
  }
});

export default Perfil;
