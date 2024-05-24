import { View, Text, Modal, TouchableOpacity, Image,} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const ModalSlidebar = ({visible, onClose,}) => {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    telefono: '',
    correo_electronico: '',
    password: '',
    tipo_usuario: '',
  });
  const navigation = useNavigation()

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          const user = JSON.parse(storedUser);
          setFormData(user);
        }
      } catch (error) {
        console.error(
          'Error al cargar los datos del usuario desde AsyncStorage:',
          error,
        );
      }
    };

    cargarDatosUsuario();
  }, []);

  return (
    <Modal
      animationType="slide-from-right"
      onDismiss={() => console.log('hola modal')}
      onShow={() => console.log('hola mundo')}
      transparent
      visible={visible}
      // onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(1,1,1, 0.5)',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            height: '100%',
            width: '65%',
            backgroundColor: '#fff',
            marginTop: 50,
            // borderRadius:20
          }}>
          <View
            style={{
              height: 45,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              // paddingHorizontal:10,
            }}></View>
          <View
            style={{
              marginTop: -45,
              padding: 0,
            }}>
            <View
              style={{
                backgroundColor: '#336699',
                alignItems: 'center',
                padding: 20,
              }}>
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
                  source={require('../../assets/Perfil.png')}
                />
                <Text style={{marginTop: 10, fontSize: 20, color:'#fff'}}>Hola, {formData.nombre}</Text>
              </View>
              
            </View>
              <TouchableOpacity onPress={()=>{navigation.navigate('ListarUsuarios'); onClose();}}>
              <View style={{flexDirection:'row', margin:10, borderBottomColor:'#000', borderBottomWidth: 1 }}>
                <Image  source={require('../../assets/usuario.png')}/>
                <Text style={{fontSize:24,}}> Usuarios</Text>
              </View>
              </TouchableOpacity>
              <View style={{flexDirection:'row', margin:10, borderBottomColor:'#000', borderBottomWidth: 1}}>
                <Image  source={require('../../assets/fincas.png')}/>
                <Text style={{fontSize:24}}> Fincas</Text>
              </View>
              <View style={{flexDirection:'row', margin:10, borderBottomColor:'#000', borderBottomWidth: 1}}>
                <Image  source={require('../../assets/variedades.png')}/>
                <Text style={{fontSize:24}}> Variedades</Text>
              </View>
              <View style={{flexDirection:'row', margin:10, borderBottomColor:'#000', borderBottomWidth: 1}}>
                <Image  source={require('../../assets/terreno.png')}/>
                <Text style={{fontSize:24}}> Lotes</Text>
              </View>
              <TouchableOpacity onPress={()=>{navigation.navigate('ListarMuestras'); onClose();}}>
              <View style={{flexDirection:'row', margin:10, borderBottomColor:'#000', borderBottomWidth: 1}}>
                <Image  source={require('../../assets/muestras.png')}/>
                <Text style={{fontSize:24}}> Muestras</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{navigation.navigate('ListarAnalisis'); onClose();}}>
              <View style={{flexDirection:'row', margin:10, borderBottomColor:'#000', borderBottomWidth: 1}}>
                <Image  source={require('../../assets/analisis.png')}/>
                <Text style={{fontSize:24}}> Analisis</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{navigation.navigate('ListarVariables'); onClose();}}>
              <View style={{flexDirection:'row', margin:10, borderBottomColor:'#000', borderBottomWidth: 1}}>
                <Image  source={require('../../assets/variables.png')}/>
                <Text style={{fontSize:24}}> Variables</Text>
              </View>
              </TouchableOpacity>
              
              
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSlidebar;
