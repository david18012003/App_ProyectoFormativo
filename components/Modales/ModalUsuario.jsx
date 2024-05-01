import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import UserModel from '../Organismos/UserModel'

const ModalUsuario = ({visible,onClose,title, data, userData, userId}) => {
  return (
    <Modal
            animationType="slide"
            onDismiss={()=> console.log("hola modal")}
            onShow={()=> console.log("hola mundo")}
            transparent
            visible={visible}
            >
                <View style={{
                    flex:1,
                    backgroundColor:'rgba(1,1,1, 0.5)',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <View
                    style={{
                        
                        height:"85%",
                        width:"90%",
                        backgroundColor:"#fff",
                        borderRadius:20
                       
                    }}
                    >
                        <View
                            style={{
                                height:45,
                                width:"100%",
                                flexDirection:"row",
                                justifyContent:"flex-end",
                                alignItems:'center',
                                // paddingHorizontal:10,
                            }}
                        >
                            <TouchableOpacity
                            onPress={onClose}
                            >
                                <Text 
                                    style={{
                                        textAlign:'center',
                                        width:30,
                                        height:30,
                                        color:"#000",
                                        fontSize:30
                                    }}
                                >X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            margin:12
                        }} >
                            <UserModel closeModal={onClose} title={title} data={data} userData={userData} userId={userId}/>
                        </View>

                    </View>

                </View>
        </Modal>
  )
}

export default ModalUsuario