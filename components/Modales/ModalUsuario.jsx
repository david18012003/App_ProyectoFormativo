import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import UserModel from '../Organismos/UserModel';

const ModalUsuario = ({visible, onClose, title, data, userData, userId}) => {
    const colors = {
        white: 'rgb(255, 255, 255)',
        teal: 'rgb(0, 128, 128)',
        tealGradient: ['rgb(255, 255, 255)', 'rgb(20,40,60)']
    };

    return (
        <Modal
            animationType="slide"
            onDismiss={() => console.log("hola modal")}
            onShow={() => console.log("hola mundo")}
            transparent
            visible={visible}
        >
            <View style={{
                flex:1,
                backgroundColor:'rgba(1,1,1, 0.5)',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <LinearGradient
                    colors={colors.tealGradient}
                    style={{
                        height:650,
                        width:350,
                        borderRadius:5
                    }}
                >
                    <View
                        style={{
                            height:45,
                            width:"100%",
                            flexDirection:"row",
                            justifyContent:"flex-end",
                            alignItems:'center',
                        }}
                    >
                        <TouchableOpacity onPress={onClose}>
                            <Image
                                style={{
                                    margin:15
                                }}
                                source={require('../../assets/cerrar.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        margin:12
                    }} >
                        <UserModel closeModal={onClose} title={title} data={data} userData={userData} userId={userId}/>
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
};

export default ModalUsuario;
