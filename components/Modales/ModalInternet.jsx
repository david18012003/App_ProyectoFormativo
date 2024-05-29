import { View, Text, Modal, TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ModalInternet = ({visible,onClose,}) => {
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
                        
                        height:"50%",
                        width:"70%",
                        backgroundColor:"#fff",
                        borderRadius:20
                       
                    }}
                    >
                        
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
                                <Text style={{textAlign:'center', color:'#000', fontSize:24}}>
                                    Verifica tu conexion a internet!!!
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-start',height:40,width:70, margin:30, marginLeft:170,backgroundColor:'#B40303',borderRadius:10 }}>
                                    <TouchableOpacity style={{textAlign:'center'}} onPress={()=>navigation.navigate('Login')}>
                                    <Text style={{ fontSize:20, color:'#fff',marginLeft:10,marginBottom:10 }}>OKEY</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>

                </View>
        </Modal>
  )
}

export default ModalInternet