import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert, Switch } from 'react-native';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import { IP } from './IP';
import axios from 'axios';

const PerfilUsuario = () => {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    telefono: '',
    correo_electronico: '',
    password: '',
    tipo_usuario: '',
  });
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newMode));
    } catch (error) {
      console.error('Error al cambiar el modo de color:', error);
    }
  };

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          const user = JSON.parse(storedUser);
          setFormData(user);
        }

        const storedDarkMode = await AsyncStorage.getItem('isDarkMode');
        if (storedDarkMode !== null) {
          setIsDarkMode(JSON.parse(storedDarkMode));
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

  const handleSubmit = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const user = JSON.parse(storedUser);
      const userId = user.identificacion;

      const token = await AsyncStorage.getItem('token');
      const baseURL = `http://${IP}:3000/usuarios/actualizar/${userId}`;
      const response = await axios.put(baseURL, formData, { headers: { token: token } });
      
      if (response.status === 201 || response.status === 200) {
        Alert.alert('Se actualizó con éxito su información personal');
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.error(error);
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
              source={require('../../assets/usuario-de-perfil.png')}
              style={styles.avatar}
            />
            <Text style={styles.headerText}>Bienvenido:</Text>
            <Text style={styles.nombre}>{formData.nombre}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#000' }}>Modo: {!isDarkMode ? 'Dia': 'Noche'}</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={isDarkMode}
              style={{ marginRight: 10 }}
            />
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
  textForm: {
    fontSize: 20,
    color: "#fff"
  }
});

export default PerfilUsuario;
