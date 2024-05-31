import { View, Text, Modal, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import UsuariosRegistro from '../page/Usuarios.Registro';
import ModalSlidebar from './ModalSlidebar';
import ModalUsuario from './ModalUsuario';
import ModalPerfil from './ModalPerfil';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colores } from '../../public/Colores';

const HeaderPrincipal = ({ title }) => {
    const navigation = useNavigation();

    const [viewModal, setViewModal] = useState(false);
    const [menu, setMenu] = useState(false);
    const [perfil, setPerfil] = useState(false);
    const [nameHeader, setNameHeader] = useState('MADAC');
    const [usuario, setUsuario]= useState()
    const [isDarkMode, setIsDarkMode] = useState(false)

    const mode = async()=>{
        try {
          const storedMode = await AsyncStorage.getItem('isDarkMode');
          if (storedMode !== null) {
            setIsDarkMode(JSON.parse(storedMode));
            console.log('Modo ',isDarkMode);
          }
        } catch (error) {
          
        }
        
      }
   
    useFocusEffect(
      useCallback(() => {
        mode();
      }, [isDarkMode])
    );
  

    useEffect(() => {
        if (title) {
            setNameHeader(title);
        }
        console.log(title);
        storedUser();
    }, [title]);

    const modalP = () => {
        setPerfil(!perfil);
    };

    const vistaPerfil = () => {
        setPerfil(false);
        navigation.navigate('Perfil');
    };

    const vistaMenu = () => {
        setMenu(false);
    };
    
    const storedUser= async()=> {
        const usuario =await AsyncStorage.getItem('user')
        const user = JSON.parse(usuario)
        const userRol= user.tipo_usuario.toLowerCase()

       setUsuario(userRol);
    }
        
    
        const slidebar = () => {
        setMenu(!menu);
    };
        
    

    return (
        <>
            <View style={[!isDarkMode ? { backgroundColor:colores.blanco } : {backgroundColor:colores.azul}]}>
                <View style={{ flexDirection: 'row', width: '100%', height: 50 }}>
                    <View style={{ marginLeft: '5%', marginRight: 'auto' }}>
                        {usuario !== 'caficultor' && (
                            <TouchableOpacity onPress={slidebar}>
                                <Image
                                    style={{ width: 30, height: 30, marginTop: 10 }}
                                    source={!isDarkMode ? require('../../assets/MenuAzul.png') : require('../../assets/MenuBlanco.png')}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.header, !isDarkMode ? {color:colores.azul} : {color:colores.blanco}]}>{nameHeader}</Text>
                    </View>
                    <View style={{ marginRight: '5%', marginLeft: 'auto' }}>
                        <TouchableOpacity onPress={modalP}>
                            <Image
                                style={{ width: 30, height: 30, marginTop: 10 }}
                                source={!isDarkMode ? require('../../assets/PerfilAzul.png') : require('../../assets/PerfilBlanco.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <ModalPerfil visible={perfil} onClose={modalP} navegacionPerfil={vistaPerfil} />

                <ModalSlidebar visible={menu} onClose={slidebar} navegacionMenu={vistaMenu} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header:{ 
        fontSize: 20,
        }
})

export default HeaderPrincipal;