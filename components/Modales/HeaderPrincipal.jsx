import { View, Text, Modal, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import UsuariosRegistro from '../page/Usuarios.Registro'
import ModalSlidebar from './ModalSlidebar'
import ModalUsuario from './ModalUsuario'
import ModalPerfil from './ModalPerfil'

const HeaderPrincipal = ({title}) => {

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

    const vista =()=>{
        setViewModal(!viewModal)
    }

    const slidebar =()=>{
        setMenu(!menu)
    }

  return (
    <>
    <View style={{felx:1, backgroundColor:'#336699'}}>
        <View style={{flexDirection:'row', width:240,height:50,}}>
            <View style={{marginTop:5, marginStart:10}}>
                <TouchableOpacity onPress={slidebar}>
                    <Text style={{fontSize:25}}>◘</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignContent:'center', alignItems:'center',justifyContent:'center', marginStart:120}}>
                    <Text style={{fontSize:20,color:'#000'}}>{nameHeader}</Text>
            </View>
            <View style={{marginStart:120, marginTop:5}}>
                <TouchableOpacity onPress={modalP}>
                    <Text style={{fontSize:30}}>☺</Text>
                </TouchableOpacity>
            </View>
        </View>

    <ModalPerfil visible={perfil} onClose={modalP}/>

   <ModalSlidebar visible={menu} onClose={slidebar}/>
    </View>
    
    </>
  )
}

export default HeaderPrincipal