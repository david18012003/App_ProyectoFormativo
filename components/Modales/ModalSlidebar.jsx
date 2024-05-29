import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {colores} from '../../public/Colores';
import ListarVariables from '../page/variables';
import ListarVariedades from '../page/ListarVariedades';

const ModalSlidebar = ({visible, onClose}) => {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    telefono: '',
    correo_electronico: '',
    password: '',
    tipo_usuario: '',
  });
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const navigation = useNavigation();

  

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          const user = JSON.parse(storedUser);
          setFormData(user);
        }
        const storedMode = await AsyncStorage.getItem('isDarkMode');
        if (storedMode !== null) {
          setIsDarkMode(JSON.parse(storedMode));
          
        }
      } catch (error) {
        console.error(
          'Error al cargar los datos del usuario o el modo de color:',
          error,
        );
      }
    };
    console.log(isDarkMode,'Modo');

    cargarDatosUsuario();
  }, [visible]);

  return (
    <Modal animationType="slide-from-right" transparent visible={visible}>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'rgba(1,1,1, 0.5)',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <View
            style={[styles.principal, isDarkMode ? {backgroundColor:colores.azul} : {backgroundColor:colores.blanco}]}>
            <View
              style={{
                height: 45,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}></View>
            <View style={{marginTop: -45, padding: 0}}>
              <View
                style={[styles.title, !isDarkMode ? {backgroundColor:colores.azul}:{backgroundColor:colores.blanco}]}>
                <TouchableOpacity
                  onPress={onClose}
                  style={{position: 'absolute', top: 10, right: 10}}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../../assets/cerrar.png')}
                  />
                </TouchableOpacity>
                <View style={{alignItems: 'center', marginTop: 20}}>
                  <Image
                    style={{width: 100, height: 100, borderRadius: 50}}
                    source={!isDarkMode ? require('../../assets/PerfilBlanco.png') : require('../../assets/PerfilAzul.png')}
                  />
                  <Text style={[styles.saludo, !isDarkMode ? {color: colores.blanco} : {color:colores.azul}]}>
                    Hola, {formData.nombre}
                  </Text>
                </View>
              </View>
            </View>

            {/* Menu */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListarUsuarios');
                onClose();
              }}>
              <View style={[styles.conten, !isDarkMode ? {borderBottomColor: colores.azul,} : {borderBottomColor: colores.blanco,} ]}>
                <Image source={require('../../assets/usuario.png')} />
                <Text
                  style={[
                    styles.text,
                    !isDarkMode ? {color: colores.azul} : {color: colores.blanco},
                  ]}>
                  {' '}
                  Usuarios
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('ListarFincas');
                onClose();
              }}>
            <View style={[styles.conten, !isDarkMode ? {borderBottomColor: colores.azul,} : {borderBottomColor: colores.blanco,} ]}>
              <Image source={require('../../assets/fincas.png')} />
              <Text
                style={[
                  styles.text,
                  !isDarkMode ? {color: colores.azul} : {color: colores.blanco},
                ]}>
                {' '}
                Fincas
              </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              navigation.navigate(ListarVariedades);
              onClose()
            }}>
            <View style={[styles.conten, !isDarkMode ? {borderBottomColor: colores.azul,} : {borderBottomColor: colores.blanco,} ]}>
              <Image source={require('../../assets/variedades.png')} />
              <Text
                style={[
                  styles.text,
                  !isDarkMode ? {color: colores.azul} : {color: colores.blanco},
                ]}>
                {' '}
                Variedades
              </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              navigation.navigate('ListarLotes')
              onClose()
            }}>
            <View style={[styles.conten, !isDarkMode ? {borderBottomColor: colores.azul,} : {borderBottomColor: colores.blanco,} ]}>
              <Image source={require('../../assets/terreno.png')} />
              <Text
                style={[
                  styles.text,
                  !isDarkMode ? {color: colores.azul} : {color: colores.blanco},
                ]}>
                {' '}
                Lotes
              </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListarMuestras');
                onClose();
              }}>
              <View style={[styles.conten, !isDarkMode ? {borderBottomColor: colores.azul,} : {borderBottomColor: colores.blanco,} ]}>
                <Image source={require('../../assets/muestras.png')} />
                <Text
                  style={[
                    styles.text,
                    !isDarkMode ? {color: colores.azul} : {color: colores.blanco},
                  ]}>
                  {' '}
                  Muestras
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListarAnalisis');
                onClose();
              }}>
              <View style={[styles.conten, !isDarkMode ? {borderBottomColor: colores.azul,} : {borderBottomColor: colores.blanco,} ]}>
                <Image source={require('../../assets/analisis.png')} />
                <Text
                  style={[
                    styles.text,
                    !isDarkMode ? {color: colores.azul} : {color: colores.blanco},
                  ]}>
                  {' '}
                  Analisis
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListarVariables');
                onClose();
              }}>
              <View style={[styles.conten, !isDarkMode ? {borderBottomColor: colores.azul,} : {borderBottomColor: colores.blanco,} ]}>
                <Image source={require('../../assets/variables.png')} />
                <Text
                  style={[
                    styles.text,
                    !isDarkMode ? {color: colores.azul} : {color: colores.blanco},
                  ]}>
                  {' '}
                  Variables
                </Text>
              </View>
            </TouchableOpacity>

            
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  principal:{
    height: '100%',
    width: '65%',
    marginTop: 50,
  },
  conten: {
    flexDirection: 'row',
    margin: 10,
    borderBottomWidth: 1,
  },
  saludo:{
    marginTop: 10, 
    fontSize: 20, 
  },
  active: {
    color: 'green',
    backgroundColor: '#000',
  },
  inactive: {
    color: 'red',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 24,
  },
  title:{
    alignItems: 'center',
    padding: 20,
  }
});

export default ModalSlidebar;
