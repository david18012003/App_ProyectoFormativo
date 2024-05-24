import { View, Text, Modal, TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ModalAlerta = ({visible,onClose,}) => {
    const navigation = useNavigation();
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
                        
                        height:"60%",
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
                                <Image 
                                    style={{
                                        width:30,
                                        height:30,
                                        margin:10
                                    }}
                                    source={require('../../assets/cerrar.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{
                            margin:12
                        }} >
                            <View style={{justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../../assets/Alerta.png')} 
                                    style={{ width: 200, height: 200 }}
                                />
                            </View>
                            <View>
                                <Text style={{textAlign:'center', color:'#000', fontSize:30}}>
                                    ¿Estas seguro que quieres cerrar sesión?
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', margin:30, }}>
                                    <TouchableOpacity onPress={onClose}>
                                    <Text style={{ textAlign: 'right', fontSize:30,color:'#000' }}>NO</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-start', margin:30, marginLeft:170 }}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                    <Text style={{ textAlign: 'left',fontSize:30, color:'#CC0000' }}>SI</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>

                </View>
        </Modal>
  )
}

export default ModalAlerta