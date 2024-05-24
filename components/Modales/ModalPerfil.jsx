import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ModalAlerta from './ModalAlerta';

const ModalPerfil = ({visible,onClose,navegacionPerfil}) => {
    const [modalAlerta,setModalAlerta]=useState(false)

    const Alerta = ()=>{
        setModalAlerta(!modalAlerta)
    }
   
  return (
    <Modal
            animationType="slide-from-left"
            onDismiss={()=> console.log("chao desde perfil")}
            onShow={()=> console.log("hola desde perfil")}
            transparent
            visible={visible}
            >
                <View style={{
                    flex:1,
                    backgroundColor:'rgba(1,1,1, 0.5)',
                    justifyContent:'flex-start',
                    alignItems:'flex-end',
                    marginTop:50
                }}>
                    <View
                    style={{
                        
                        height:"20%",
                        width:"40%",
                        backgroundColor:"#fff",
                        borderRadius:20
                       
                    }}
                    >
                        <View
                            style={{
                                height:45,
                                width:"100%",
                                flexDirection:"row",
                                justifyContent:"flex-start",
                                alignItems:'center',
                                paddingHorizontal:10,
                            }}
                        >
                            <TouchableOpacity
                            onPress={onClose}
                            >
                                <Image
                                    style={{
                                        width:30,
                                        height:30,
                                    }}
                                    source={require('../../assets/cerrar.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            margin:12
                        }} >
                            <TouchableOpacity onPress={navegacionPerfil}>
                                <Text style={{
                                        color:"#000",
                                        fontSize:20,

                                    }}>Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={Alerta}>
                                <Text style={{
                                        color:"#000",
                                        fontSize:20,
                                        marginTop:30,
                                        marginBottom:10
                                    }}>Cerrar Sesion</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                <ModalAlerta visible={modalAlerta} onClose={Alerta}/>
        </Modal>
  )
}

export default ModalPerfil