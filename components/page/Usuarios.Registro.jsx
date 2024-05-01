import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { IP } from './IP';

const UsuariosRegistro = () => {

    const navigation = useNavigation();
    const [formData, setFormData] = useState({
         identificacion: '',
         nombre: '',
         telefono: '',
         correo_electronico: '',
         password: '',
         tipo_usuario: '',
    });
    const [perfil, setPerfil] = useState(false);
  const [menu, setMenu] = useState(false);

  const openPerfilModal = () => {
    setPerfil(true);
  };

  const closePerfilModal = () => {
    setPerfil(false);
  };

  const openSlidebar = () => {
    setMenu(true);
  };

  const closeSlidebar = () => {
    setMenu(false);
  };

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    //   const ip = "192.168.143.19"
    const ip = IP

    const handleSubmit = async ()=>{
        console.log(formData)
        try {
            // const token = localStorage.getItem('token');

        const baseURL = `http://${ip}:3000/usuarios/registrar`;
        await axios.post(baseURL, formData);
        alert('Usuario registrado exitosamente');

        navigation.navigate('Listar Usuarios');
        } catch (error) {
            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un código de estado que no está en el rango de 2xx
                console.error('Error de respuesta:', error.response.data);
                console.error('Código de estado:', error.response.status);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió ninguna respuesta
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                // Algo sucedió en la configuración de la solicitud que desencadenó un error
                console.error('Error durante la solicitud:', error.message);
            }
            console.error('Error:', error.config);
            alert('Error al registrar usuario. Por favor, revisa la consola para más detalles.');
        
        }

    }
    


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro de Usuario</Text>

            <View style={styles.formulario}>
                <Text style={styles.etiqueta}>Identificación:</Text>
                <TextInput style={styles.input} placeholderTextColor="#999"  value={formData.identificacion} onChangeText={(text) => handleInputChange('identificacion', text)} placeholder='N° de identificación' keyboardType='numeric'/>

                <Text style={styles.etiqueta}>Nombre:</Text>
                <TextInput style={styles.input} placeholderTextColor="#999"  value={formData.nombre} onChangeText={(text) => handleInputChange('nombre', text)} placeholder='Nombre(s)'/>

                <Text style={styles.etiqueta}>Teléfono:</Text>
                <TextInput style={styles.input} placeholderTextColor="#999"  value={formData.telefono} onChangeText={(text) => handleInputChange('telefono', text)} placeholder='Teléfono'/>

                <Text style={styles.etiqueta}>Correo:</Text>
                <TextInput style={styles.input} placeholderTextColor="#999"  value={formData.correo_electronico} onChangeText={(text) => handleInputChange('correo_electronico', text)} placeholder='Correo'/>

                <Text style={styles.etiqueta}>Contraseña:</Text>
                <TextInput style={styles.input}  placeholderTextColor="#999"  value={formData.password} onChangeText={(text) => handleInputChange('password', text)} placeholder='Contraseña' secureTextEntry={true}/>

                <Text style={styles.etiqueta}>Tipo de usuario:</Text>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value) => handleInputChange('tipo_usuario',value)}
                    placeholder={{ label: 'Tipo de usuario', value: null }}
                    items={[
                        { label: 'Catador', value: 'catador' },
                        { label: 'Caficultor', value: 'caficultor' },
                    ]}
                />
            </View>

            <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                <Text style={styles.textoBoton}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:"#000",
    },
    formulario: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor:'#D9D9D9',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    etiqueta: {
        fontSize: 16,
        marginBottom: 5,
        color:"#000",
    },
    input: {
        height: 40,
        borderColor: '#9c9c9c',
        backgroundColor:'#fff',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color:'#000'
        
    },
    boton: {
        backgroundColor: '#39A900',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    textoBoton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#9c9c9c',
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#fff',
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#9c9c9c',
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#fff',
    },
    placeholder: {
        color: '#999',
    },
});

export default UsuariosRegistro;
