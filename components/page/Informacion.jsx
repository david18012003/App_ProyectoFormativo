import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import HeaderPrincipal from '../Modales/HeaderPrincipal'

const Informacion = () => {
  return (
    <>
    <HeaderPrincipal/>
    <View style={styles.container}>
        <View style={styles.imagen}>
          <Image
            source={require('../../assets/logoProyecto.png')} 
            style={styles.imagen} 
          />
        </View>

        <View>
            <Text style={styles.tittle}>¿Que es MADAC-Coffee?</Text>
            <Text style={styles.contenido}>Software para llevar un 
                inventario de los analisis 
                que se realizan a las 
                muestras de café que los 
                caficultores llevan a la 
                ENCC para estudiar su 
                trazabilidad.</Text>
        </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    imagen: {
        backgroundColor: "#d9d9d9",
        borderRadius: 30,
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom:40, 
        height: 250,
        width: 250,
      },
    tittle: {
        color: "#000",
        fontSize: 30,
        textAlign:'center',

    },
    contenido:{
      color:"#111",
      fontSize:24,
      textAlign:'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        paddingHorizontal: 20,
      },
})


export default Informacion