import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from './IP';


// const ip = "192.168.143.19";

const ip =IP

const Login = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    correo_electronico: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const Validacion = async () =>{
    console.log(formData)
    try {
      const baseURL = `http://${ip}:3000/validacion`;

      const response = await axios.post(baseURL, formData);
      console.log(response.status);

      
        const { token } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user[0]));

        const storedUser = await AsyncStorage.getItem('user')
        const user = JSON.parse(storedUser)
        const userRol= user.tipo_usuario.toLowerCase()
        console.log(userRol)
        
        const tokenAsyng = await AsyncStorage.getItem('token')


        if (userRol == 'catador') {
          navigation.navigate("Listar");
          console.log(tokenAsyng)
          alert('Bienvenido Catador');
        }else if (userRol === 'caficultor'){
          navigation.navigate("vista1");
          console.log(tokenAsyng)
          alert('Bienvenido Caficultor');
        }else{
          alert("Su rol es: "+userRol);

        }
        // navigation.navigate("vista1");
        // alert('Logueado');

      
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Usuario no registrado');
      } else {
        console.error(error);
        alert('Error del servidor');
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imagen}>
          <Image
            source={require('../../assets/logoProyecto.png')} // Ruta de la imagen
            style={styles.imagen} // Estilo de la imagen
          />
        </View>
        <View style={styles.formulario}>
          <Text style={styles.titulo}>INICIAR SESION </Text>
          <Text style={styles.etiqueta}>Correo electronico:</Text>
          <TextInput style={styles.input} placeholderTextColor="#999"  value={formData.correo_electronico} onChangeText={(text) => handleInputChange('correo_electronico', text)} placeholder='Correo electronico'/>
          <Text style={styles.etiqueta}>Contraseña:</Text>
          <TextInput style={styles.input}  placeholderTextColor="#999"  value={formData.password} onChangeText={(text) => handleInputChange('password', text)} placeholder='Contraseña' secureTextEntry={true}/>

          <TouchableOpacity style={styles.boton} onPress={Validacion}>
            <Text style={styles.textoBoton}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

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
    textAlign:'center',
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
    backgroundColor: '#336699',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop:10,
    marginStart:60,
    height:50,
    width:180,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    textAlign:'center',
    fontWeight: 'bold',
  },
  imagen: {
    backgroundColor: "#d9d9d9",
    borderRadius: 30,
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom:40, 
    height: 250,
    width: 250,
  }
});

export default Login;
