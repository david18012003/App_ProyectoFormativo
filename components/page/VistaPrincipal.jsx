import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'

const VistaPrincipal = () => {
  return (
    <>
    <View style={styles.contenedorPrincipal}>
      <View style={styles.header}>
        <Image source={require('../../assets/Perfil.png')}
        style={styles.Imagen}/>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
 contenedorPrincipal:{
  flex:1,
  backgroundColor:'#00a'
 },
 header:{
  backgroundColor:'#fff',
  width: '100%',
  height:200
 },
 Imagen:{
  backgroundColor:'#000',
  alignContent: 'center'
 }
})

export default VistaPrincipal