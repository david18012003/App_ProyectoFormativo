import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../page/IP';

const FincaModel = () => {
  const [persona, setPersona] = useState({
    nombre: '',
    dimension_mt2: '',
    fk_caficultor: '',
    municipio: '',
    vereda: '',
  });

  const [dataCaficultores, setDataCaficultores] = useState([]);
  const [dataMunicipios, setDataMunicipios] = useState([]);

  const urlCaficultores = `http://${IP}:3000/usuarios/listar`;
  const urlMunicipios = `http://${IP}:3000/municipios/listar`;
  const url = `http://${IP}:3000/fincas/registrar`;

  useEffect(() => {
    async function fetchData() {
      try {
        const responseCaficultores = await axios.get(urlCaficultores);
        console.log('Caficultores response:', responseCaficultores.data);
        const tempCaficultores = responseCaficultores.data.usuarios.map((item) => {
          return { key: item.identificacion.toString(), value: item.nombre };
        });
        setDataCaficultores(tempCaficultores);

        const responseMunicipios = await axios.get(urlMunicipios);
        console.log('Municipios response:', responseMunicipios.data);
        const tempMunicipios = responseMunicipios.data.map((item) => {
          return { key: item.id_municipio.toString(), value: item.nombre };
        });
        setDataMunicipios(tempMunicipios);
      } catch (e) {
        console.log('Error fetching data:', e);
      }
    }
    fetchData();
  }, []);

  const handleSelectCaficultor = (val) => {
    console.log('Selected Caficultor Key:', val);
    if (val) {
      setPersona({ ...persona, fk_caficultor: val });
    }
  };

  const handleSelectMunicipio = (val) => {
    console.log('Selected Municipio Key:', val);
    if (val) {
      setPersona({ ...persona, municipio: val });
    }
  };

  const enviarPersona = async () => {
    if (!persona.nombre || !persona.dimension_mt2 || !persona.fk_caficultor || !persona.municipio || !persona.vereda) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (isNaN(persona.dimension_mt2)) {
      Alert.alert('Error', 'La dimensión debe ser números');
      return;
    }

    if (isNaN(persona.fk_caficultor)) {
      Alert.alert('Error', 'El ID del caficultor debe ser un número');
      return;
    }

    if (/\d/.test(persona.vereda)) {
      Alert.alert('Error', 'La vereda no puede contener números');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Token no encontrado');
        return;
      }

      console.log(token);
      const response = await axios.post(url, persona, { headers: { token: token } });
      console.log(response.data);
      Alert.alert('Registro exitoso', 'La finca ha sido registrada correctamente');

      setPersona({
        nombre: '',
        dimension_mt2: '',
        fk_caficultor: '',
        municipio: '',
        vereda: '',
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Ha ocurrido un error al registrar la finca');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={require('../../assets/logoProyectoNegro.png')} />
        <Text style={styles.title}>Registrar Finca</Text>
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            value={persona.nombre}
            onChangeText={(nombre) => setPersona({ ...persona, nombre })}
            placeholder="Nombre"
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.input}
            value={persona.dimension_mt2}
            onChangeText={(dimension_mt2) => setPersona({ ...persona, dimension_mt2 })}
            placeholder="Dimensión (mt2)"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />
          <SelectList
            setSelected={handleSelectCaficultor}
            data={dataCaficultores}
            selected={persona.fk_caficultor}
            placeholder="Seleccione un caficultor"
            placeholderTextColor="#000"
            boxStyles={styles.selectBox}
            dropdownStyles={styles.selectDropdown}
          />
          <SelectList
            setSelected={handleSelectMunicipio}
            data={dataMunicipios}
            selected={persona.municipio}
            placeholder="Seleccione un municipio"
            placeholderTextColor="#000"
            boxStyles={styles.selectBox}
            dropdownStyles={styles.selectDropdown}
          />
          <TextInput
            style={styles.input}
            value={persona.vereda}
            onChangeText={(vereda) => setPersona({ ...persona, vereda })}
            placeholder="Vereda"
            placeholderTextColor="#000"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={enviarPersona}>
          <Text style={styles.buttonText}>Enviar datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B',
  },
  formulario: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#00796B',
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#00796B',
  },
  selectBox: {
    width: '100%',
    borderColor: '#00796B',
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  selectDropdown: {
    width: '100%',
    borderColor: '#00796B',
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    width: '100%',
    backgroundColor: '#00796B',
    borderColor: '#00796B',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#E0F7FA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FincaModel;
