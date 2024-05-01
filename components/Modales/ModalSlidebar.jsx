import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const ModalSlidebar = ( {visible,onClose}) => {
    
  return (
    
       <Modal
            animationType='slide-from-right'
            onDismiss={()=> console.log("hola modal")}
            onShow={()=> console.log("hola mundo")}
            transparent
            visible={visible}
            // onRequestClose={onClose}
            >
                <View style={{
                    flex:1,
                    backgroundColor:'rgba(1,1,1, 0.5)',
                    justifyContent:'flex-start',
                    alignItems:'flex-start',
                    
                }}>
                    <View
                    style={{
                        
                        height:"100%",
                        width:"55%",
                        backgroundColor:"#fff",
                        marginTop:50
                        // borderRadius:20
                       
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
                            
                        </View>

                    </View>

                </View>
        </Modal>
    
  )
}

export default ModalSlidebar