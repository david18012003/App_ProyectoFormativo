import { View, Text, Modal, Button, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import UsuariosRegistro from '../page/Usuarios.Registro'
import ModalSlidebar from './ModalSlidebar'
import ModalUsuario from './ModalUsuario'
import ModalPerfil from './ModalPerfil'
import { useNavigation } from '@react-navigation/native'

const HeaderPrincipal = ({title}) => {
    const navigation = useNavigation()


    const [viewModal, setViewModal] = useState(false)
    const [menu, setMenu] = useState(false)
    const [perfil, setPerfil] = useState(false)
    const [nameHeader, setNameHeader] = useState('MADAC')

    useEffect(()=>{
        if (title) {
            setNameHeader(title)
        }
        console.log(title)
    },[title])
    const modalP = ()=>{
        setPerfil(!perfil)
    }

    const vistaPerfil =()=>{
        setPerfil(false)
        navigation.navigate('Perfil')
        
    }
    const vistaMenu =()=>{
        setMenu(false)
    }

    const slidebar =()=>{
        setMenu(!menu)
    }

  return (
    <>
    <View style={{ backgroundColor:'#336699'}}>
    <View style={{ flexDirection: 'row', width: '100%', height: 50 }}>
            <View style={{ marginLeft: '5%', marginRight: 'auto' }}>
                <TouchableOpacity onPress={slidebar}>
                    <Image style={{ width: 30, height: 30, marginTop: 10 }} source={require('../../assets/Menu.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color:"#fff" }}>{nameHeader}</Text>
            </View>
            <View style={{ marginRight: '5%', marginLeft: 'auto' }}>
                <TouchableOpacity onPress={modalP}>
                    <Image style={{width:30, height:30, marginTop:10}} source={require('../../assets/Perfil.png')}/>
                </TouchableOpacity>
            </View>
        </View>

    <ModalPerfil visible={perfil} onClose={modalP} navegacionPerfil={vistaPerfil}/>

   <ModalSlidebar visible={menu} onClose={slidebar} navegacionMenu={vistaMenu}/>
    </View>
    
    </>
  )
}

export default HeaderPrincipal