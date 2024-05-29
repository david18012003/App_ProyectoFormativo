import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { IP } from './IP'
import { useFocusEffect } from '@react-navigation/native'
import HeaderPrincipal from '../Modales/HeaderPrincipal'
import { sharedStyles } from '../../public/Colores'
import RNPickerSelect from 'react-native-picker-select'

const ListarLotes = () => {
  const [isDarkMode, setIsDarkMode]= useState(false)
  const [lotes, setLotes]=useState([])
  const [searchTerm,setSearchTerm]=useState()
  const [selectedStatus, setSelectedStatus]=useState()

  const mode = async()=>{
    try {
      const darkMode = await AsyncStorage.getItem('isDarkMode')
      const storedMode = (JSON.parse(darkMode))
      if (storedMode !== null) {
        setIsDarkMode(storedMode)
      }
    } catch (error) {
      
    }
  }
  useFocusEffect(
    React.useCallback(()=>{
      mode()
    },[])
  )
  const ListarLote =async()=>{
    try {
      const tokenAsyng = await AsyncStorage.getItem('token')
      const url = `http://${IP}:3000/lotes/listar`
      const consulta = await axios.get(url,{headers:{token:tokenAsyng}})
      setLotes(consulta.data);
    } catch (error) {
      
    }
  } 
  console.log(lotes);
  useEffect(()=>{
    ListarLote()
  },[])
  return (
    <>
    <HeaderPrincipal title={'Lotes'}/>
    <View style={[sharedStyles.container, !isDarkMode ? sharedStyles.conteinerNoche : sharedStyles.conteinerDia]}>
      <View style={sharedStyles.inputContainer}>
        <View style={sharedStyles.selectContainer}>
        <TextInput
              style={sharedStyles.input}
              placeholder="Buscar Finca"
              placeholderTextColor={'#999'}
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
            <View style={sharedStyles.pickerContainer1}>
              <RNPickerSelect
                onValueChange={value => setSelectedStatus(value)}
                placeholder={{label: 'Estado', value: null}}
                items={[
                  {label: 'Activo', value: 'activo', key: 'activo'},
                  {label: 'Inactivo', value: 'inactivo', key: 'inactivo'},
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              />
            </View>
        </View>
        <ScrollView style={sharedStyles.scrollView}>
          {lotes.map(lote=>(
          <View key={lote.codigo} style={[sharedStyles.userContainer, !isDarkMode ?sharedStyles.conteinerNoche :sharedStyles.conteinerDia]}>
          <View style={sharedStyles.itemContainer}>
            <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Identificacion:</Text>
            <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>
              {lote.codigo}
            </Text>
          </View>
          <View style={sharedStyles.itemContainer}>
            <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Nombre:</Text>
            <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>
              {lote.nombre}
            </Text>
          </View>
          <View style={sharedStyles.itemContainer}>
            <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Teléfono:</Text>
            <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>
              {lote.telefono}
            </Text>
          </View>
          <View style={sharedStyles.itemContainer}>
            <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Tipo de usuario:</Text>
            <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>
              {lote.tipo_usuario}
            </Text>
          </View>
          <View style={sharedStyles.itemContainer}>
            <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Estado:</Text>
            <Text
              style={[
                sharedStyles.value,
                lote.estado === 'activo' ? sharedStyles.active : sharedStyles.inactive,
              ]}>
              {lote.estado}
            </Text>
          </View>
          </View>))}
            
        </ScrollView>
      </View>

    </View>
    </>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#9c9c9c',
    borderRadius: 10, // Redondea las esquinas del select
    color: '#000',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginRight: 10,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#9c9c9c',
    borderRadius: 10, // Redondea las esquinas del select
    color: '#fff',
    backgroundColor: '#A3DBEE',
    marginBottom: 5,
    marginRight: 8,
  },
  placeholder: {
    color: '#000', // Color del texto del placeholder
    fontSize: 14,
    paddingHorizontal: 10,
  },
});


export default ListarLotes