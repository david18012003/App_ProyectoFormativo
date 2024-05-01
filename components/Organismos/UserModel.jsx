import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { IP } from '../page/IP';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserModel = ({ closeModal, title, data, userData ,userId}) => {
    const [formData, setFormData] = useState({
        identificacion: userData ? userData.identificacion.toString() : '', // Convertir a string
        nombre: userData ? userData.nombre : '',
        telefono: userData ? userData.telefono.toString() : '', // Convertir a string
        correo_electronico: userData ? userData.correo_electronico : '',
        password: userData ? userData.password : '',
        tipo_usuario: userData ? userData.tipo_usuario : '',
    });

    

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const ip = IP;

    const handleSubmit = async () => {
        try {
            const baseURL = `http://${ip}:3000/usuarios/registrar`;
            const token = await AsyncStorage.getItem('token');
            await axios.post(baseURL, formData, { headers: { token: token } });
            alert('Usuario registrado exitosamente');
            closeModal();
            data();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar usuario. Por favor, revisa la consola para más detalles.');
        }
    };

    const handleActualizar = async () => {
        try {
            console.log(userId);
            const token = await AsyncStorage.getItem('token');
            const baseURL = `http://${ip}:3000/usuarios/actualizar/${userId}`;
            const response = await axios.put(baseURL, formData, { headers: { token: token } });
            if (response.status === 201) {
                Alert.alert('Se Actualizo con éxito el Usuario');
                closeModal();data();
                
            } else {
                console.log(response.status);
                Alert.alert('Error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{title}</Text>

            <View style={styles.formulario}>
                <Text style={styles.etiqueta}>Identificación:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    value={formData.identificacion}
                    onChangeText={(text) => handleInputChange('identificacion', text)}
                    placeholder='N° de identificación'
                    keyboardType='numeric'
                />

                <Text style={styles.etiqueta}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    value={formData.nombre}
                    onChangeText={(text) => handleInputChange('nombre', text)}
                    placeholder='Nombre(s)'
                />

                <Text style={styles.etiqueta}>Teléfono:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    value={formData.telefono}
                    onChangeText={(text) => handleInputChange('telefono', text)}
                    placeholder='Teléfono'
                    keyboardType='phone-pad'
                />

                <Text style={styles.etiqueta}>Correo:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    value={formData.correo_electronico}
                    onChangeText={(text) => handleInputChange('correo_electronico', text)}
                    placeholder='Correo'
                    keyboardType='email-address'
                />

                <Text style={styles.etiqueta}>Contraseña:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                />

                <Text style={styles.etiqueta}>Tipo de usuario:</Text>
                <View style={pickerSelectStyles}>
                    <RNPickerSelect
                        onValueChange={(value) => handleInputChange('tipo_usuario', value)}
                        placeholder={{ label: 'Tipo de usuario', value: null }}
                        items={[
                            { label: 'Catador', value: 'catador' },
                            { label: 'Caficultor', value: 'caficultor' },
                        ]}
                        value={formData.tipo_usuario}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.boton} onPress={title === 'Registrar' ? handleSubmit : handleActualizar}>
                <Text style={styles.textoBoton}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
    etiqueta: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000',
    },
    input: {
        height: 40,
        borderColor: '#9c9c9c',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#000',
    },
    pickerContainer: {
        flex: 1,
        borderRadius: 8,
        height: 40,
        borderColor: '#9c9c9c',
        color:"#000"
      },
    boton: {
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        height:40,
        width:110,
        backgroundColor: '#336699',
        borderRadius: 5,
        marginStart:110
    },
    textoBoton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',  
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
      color: '#000',
      backgroundColor: '#fff',
      marginBottom: 5,
      marginRight: 8,
    },
    placeholder: {
      color: '#000', // Color del texto del placeholder
      fontSize: 14,
      paddingHorizontal: 10,
    },
  });
export default UserModel;
