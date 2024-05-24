import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, } from 'react-native';
import axios from 'axios';
import {IP} from '../page/IP';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserModel = ({closeModal, title, data, userData, userId}) => {
  const [formData, setFormData] = useState({
    identificacion: userData ? userData.identificacion.toString() : '', // Convertir a string
    nombre: userData ? userData.nombre : '',
    telefono: userData ? userData.telefono.toString() : '', // Convertir a string
    correo_electronico: userData ? userData.correo_electronico : '',
    password: userData ? userData.password : '',
    tipo_usuario: userData ? userData.tipo_usuario : '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const ip = IP;

  const handleSubmit = async () => {
    try {
      const baseURL = `http://${ip}:3000/usuarios/registrar`;
      const token = await AsyncStorage.getItem('token');
      await axios.post(baseURL, formData, {headers: {token: token}});
      Alert.alert('Usuario registrado exitosamente');
      closeModal();
      data();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error al registrar usuario. Por favor, revisa la consola para más detalles.',
      );
    }
  };

  const handleActualizar = async () => {
    try {
      console.log(userId);
      const token = await AsyncStorage.getItem('token');
      const baseURL = `http://${ip}:3000/usuarios/actualizar/${userId}`;
      const response = await axios.put(baseURL, formData, {
        headers: {token: token},
      });
      if (response.status === 201) {
        Alert.alert('Se Actualizo con éxito el Usuario');
        closeModal();
        data();
      } else {
        console.log(response.status);
        Alert.alert('Error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titulo}>{title} Usuario</Text>
            <Image style={styles.Imagen} source={require('../../assets/logoProyectoNegro.png')}/>
          <View style={styles.formulario}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#000"
              value={formData.identificacion}
              onChangeText={text => handleInputChange('identificacion', text)}
              placeholder="N° de identificación"
              keyboardType="numeric"
            />

            
            <TextInput
              style={styles.input}
              placeholderTextColor="#000"
              value={formData.nombre}
              onChangeText={text => handleInputChange('nombre', text)}
              placeholder="Nombre(s)"
            />

            <TextInput
              style={styles.input}
              placeholderTextColor="#000"
              value={formData.telefono}
              onChangeText={text => handleInputChange('telefono', text)}
              placeholder="Teléfono"
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholderTextColor="#000"
              value={formData.correo_electronico}
              onChangeText={text =>
                handleInputChange('correo_electronico', text)
              }
              placeholder="Correo"
              keyboardType="email-address"
            />

            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholderTextColor="#000"
                value={formData.password}
                onChangeText={text => handleInputChange('password', text)}
                placeholder="Contraseña"
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity
                onPress={toggleSecureEntry}
                style={styles.eyeIconContainer}>
                <Image
                  style={styles.eyeIcon}
                  source={
                    secureTextEntry
                      ? require('../../assets/cerrar-ojo.png')
                      : require('../../assets/ojo.png')
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={pickerSelectStyles}>
              <RNPickerSelect
                onValueChange={value =>
                  handleInputChange('tipo_usuario', value)
                }
                placeholder={{label: 'Tipo de usuario', value: null}}
                items={[
                  {label: 'Catador', value: 'catador'},
                  {label: 'Caficultor', value: 'caficultor'},
                ]}
                value={formData.tipo_usuario}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.boton}
            onPress={title === 'Registrar' ? handleSubmit : handleActualizar}>
            <Text style={styles.textoBoton}>{title}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#000',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  formulario: {
    marginBottom: 20,
    marginTop:25
  },
  Imagen:{
    height:200,
    width:200,
    alignItems:'center'
  },
  etiqueta: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: '#000',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 8,
    height: 40,
    borderColor: '#9c9c9c',
    color: '#000',
  },
  boton: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 110,
    backgroundColor: '#797D7F',
    borderColor: '#000',
    borderWidth:2,
    borderRadius: 5,
  },
  textoBoton: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
   passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width:300,
    borderColor: '#000',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  passwordInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    paddingVertical: 10,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10, // Redondea las esquinas del select
    color: '#000',
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginRight: 10,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10, // Redondea las esquinas del select
    color: '#000',
    backgroundColor: 'transparent',
    marginBottom: 5,
    marginRight: 8,
    width:300
  },
  placeholder: {
    color: '#000', // Color del texto del placeholder
    fontSize: 14,
    paddingHorizontal: 10,
  },
  
});


export default UserModel;
