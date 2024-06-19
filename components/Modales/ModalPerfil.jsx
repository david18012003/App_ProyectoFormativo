import {View, Text, Modal, TouchableOpacity, Image, Switch} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ModalAlerta from './ModalAlerta';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalPerfil = ({visible, onClose, navegacionPerfil}) => {
  const [modalAlerta, setModalAlerta] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); 


  const Alerta = () => {
    setModalAlerta(!modalAlerta);
  };
  const toggleDarkMode = async () => {
    try {
      setIsDarkMode(prevMode => !prevMode); 
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode)); 
    } catch (error) {
      console.error('Error al cambiar el modo de color:', error);
    }
  };

  return (
    <Modal
      animationType="slide-from-left"
      onDismiss={() => console.log('chao desde perfil')}
      onShow={() => console.log('hola desde perfil')}
      transparent
      visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(1,1,1, 0.5)',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          marginTop: 50,
        }}>
        <View
          style={{
            height: '23%',
            width: '40%',
            backgroundColor: '#fff',
            borderRadius: 20,
          }}>
          <View
            style={{
              height: 45,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity onPress={onClose}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../assets/cerrar.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              margin: 12,
            }}>
            <TouchableOpacity onPress={navegacionPerfil}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                }}>
                Perfil
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Alerta}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  marginTop: 30,
                  marginBottom: 10,
                }}>
                Cerrar Sesion
              </Text>
            </TouchableOpacity>
            {/* <View style={{flexDirection:'row'}}>
            <Text style={{color:'#000'}}>Modo: </Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={isDarkMode}
              style={{marginRight: 10}}
            />
            </View> */}
          </View>
        </View>
      </View>
      <ModalAlerta visible={modalAlerta} onClose={Alerta} />
    </Modal>
  );
};

export default ModalPerfil;
