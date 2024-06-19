import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,} from 'react-native';
import axios from 'axios';
import {IP} from '../page/IP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const VariableModel = ({closeModal, title, data, userData, userId}) => {
  const [formData, setFormData] = useState({
    nombre: userData ? userData.nombre : '',
    fk_tipo_analisis: userData ? userData.fk_tipo_analisis : null,
  });

  const [TipoAnalisisOptions, SetTipoAnalisiOptions] = useState([]);

  useEffect(() => {
    const fetchTipoAnalisis = async () => {
      try {
        const response = await axios.get(
          `${IP}/tipoanalisis/listar`,
        );
        SetTipoAnalisiOptions(response.data);
      } catch (error) {
        console.error('Error al cargar los análisis ' + error);
      }
    };
    fetchTipoAnalisis();
    if (title === "Actualizar" && userData) {
      setFormData({
        nombre: userData.nombre,
        fk_tipo_analisis: userData.fk_tipo_analisis,
      });
    }
  }, []);

  useEffect(() => {
    if (title === 'Actualizar' && userData) {
      setFormData({
        nombre: userData.nombre,
        fk_tipo_analisis: userData.fk_tipo_analisis,
      });
    }
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async () => {
    try {
      const baseURL = `${IP}/variables/crearvariable`;
      const token = await AsyncStorage.getItem('token');
      await axios.post(baseURL, formData, {headers: {token: token}});
      Alert.alert('Variable registrada con éxito.');
      closeModal();
      data();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error al registrar la variable. Por favor, revisa la consola para más detalles.',
      );
    }
  };
  const handleActualizar = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const baseURL = `${IP}/variables/actualizarvariable/${userId}`;
      const response = await axios.put(baseURL, formData, {
        headers: {token: token},
      });
      console.log(formData);
      if (response.status === 200) {
        Alert.alert('Se actualizó con éxito la variable');
        closeModal();
        data();
      } else {
        Alert.alert('Error al actualizar la variable');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error al actualizar');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{title}</Text>

      <View style={styles.formulario}>
        <Text style={styles.etiqueta}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.nombre}
          onChangeText={text => handleInputChange('nombre', text)}
          placeholder="Nombre(s)"
        />
        <Text style={styles.etiqueta}>Tipo de análisis:</Text>
        <RNPickerSelect
          style={styles.input}
          value={formData.fk_tipo_analisis}
          onValueChange={itemValue =>
            handleInputChange('fk_tipo_analisis', itemValue)
          }
          items={
            TipoAnalisisOptions.length > 0 &&
            TipoAnalisisOptions.map(tipo_analisis => ({
              label: tipo_analisis.tipo_analisis,
              value: tipo_analisis.id,
              
            }))
          }
        />
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={title === 'Registrar' ? handleSubmit : handleActualizar}>
        <Text style={styles.textoBoton}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#000',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  formulario: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#9c9c9c',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 8,
    height: 40,
    borderColor: '#9c9c9c',
    color: '#000',
  },
  boton: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 110,
    backgroundColor: '#336699',
    borderRadius: 5,
    marginStart: 110,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
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
    color: '#000',
    backgroundColor: '#fff',
    marginBottom: 5,
    marginRight: 8,
  },
  placeholder: {
    color: '#000', // Color del texto del placeholder
    fontSize: 14,
    paddingHorizontal: 10,
  },
});
export default VariableModel;
