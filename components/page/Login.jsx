import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from './IP';
import NetInfo from '@react-native-community/netinfo'

const ip =IP

const Login = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    correo_electronico: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state =>{
      console.log('Tipo de conexion', state.type);
      console.log('Is conected??', state.isConnected);
      if (!state.isConnected) {
        Alert.alert('Sin conexion ', 'Por favor,  verifica tu conexion a internet.')
    }
    }) 
    return()=>{
      unsubscribe();
    }
    
  },[])
    
  
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const Validacion = async () =>{
    const connectionInfo = await NetInfo.fetch()
    if (!connectionInfo.isConnected) {
      Alert.alert('Sin conexion ', 'Porfavor, verifica ti conexion a internet')
      return
    }
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
        const userStatus = user.estado
        console.log(userStatus);
        console.log(userRol)
        
        const tokenAsyng = await AsyncStorage.getItem('token')


        if (userRol == 'catador' && userStatus=='activo') {
          navigation.navigate("ListarUsuarios");
          console.log(tokenAsyng)
          Alert.alert('Bienvenido Catador');
        }else if (userRol === 'caficultor' && userStatus=='activo'){
          navigation.navigate("vista1");
          console.log(tokenAsyng)
          Alert.alert('Bienvenido Caficultor');
        }else{
          if (userRol=='catador'&&userStatus=='inactivo' || userRol=='caficultor'&&userStatus=='inactivo') {
            Alert.alert("Lo sentimor pero no esta activo en el sistema. ");
          }else{
            Alert.alert("Sus datos son erroneos ");
          }

        }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Usuario no registrado');
      } else {
        console.error(error);
        Alert.alert('Error del servidor ',error);
      }
    }
  }

  return (
    <>
    <ImageBackground
        source={require('../../assets/Login.png')} 
        style={styles.background}
      >
      <View style={styles.container}>
        
          <Image
            source={require('../../assets/logoProyectoNegro.png')} // Ruta de la imagen
            style={styles.imagen} // Estilo de la imagen
          />
        
        <View>
          <Text style={styles.titulo}>INICIAR SESION </Text>
          <TextInput style={styles.input} placeholderTextColor="#000"  value={formData.correo_electronico} onChangeText={(text) => handleInputChange('correo_electronico', text)} placeholder='Correo'/>
          <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholderTextColor="#000"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            placeholder="Contraseña"
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Image
              style={styles.eyeIcon}
              source={secureTextEntry ? require('../../assets/cerrar-ojo.png') : require('../../assets/ojo.png')}
            />
          </TouchableOpacity>
        </View>
          <TouchableOpacity style={styles.boton} onPress={Validacion}>
            <Text style={styles.textoBoton}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={styles.textoBoton}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },

  input: {
    height: 40,
    width:300,
    backgroundColor: '#58AAD8',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  boton: {
    backgroundColor: '#337FA9',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
    height:40
  },
  textoBoton: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagen: {
    marginBottom: 10,
    height: 230,
    width: 230,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#58AAD8',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',

  },
  
  eyeIcon: {
    width: 24,
    height: 24,
  },
});

export default Login;
