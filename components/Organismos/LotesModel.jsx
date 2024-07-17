import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../page/IP';

const LotesModel = () => {
  const [lote, setLote] = useState({
    numero_arboles: '',
    fk_finca: '',
    fk_variedad: '',
    estado: 'activo',
  });

  const [dataFincas, setDataFincas] = useState([]);
  const [dataVariedades, setDataVariedades] = useState([]);

  const urlFincas = `http://${IP}:3000/fincas/listar`;
  const urlVariedades = `http://${IP}:3000/variedades/listar`;
  const urlRegistro = `http://${IP}:3000/lotes/registrar`;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'Token no encontrado');
          return;
        }

        const headers = { token: token };

        const responseFincas = await axios.get(urlFincas, { headers });
        const tempFincas = responseFincas.data.map((item) => {
          return { key: item.codigo.toString(), value: item.nombre_finca };
        });
        setDataFincas(tempFincas);

        const responseVariedades = await axios.get(urlVariedades, { headers });
        const tempVariedades = responseVariedades.data.map((item) => {
          return { key: item.codigo.toString(), value: item.nombre };
        });
        setDataVariedades(tempVariedades);
      } catch (e) {
        console.log('Error fetching data:', e);
      }
    }
    fetchData();
  }, []);

  const handleSelectFinca = (val) => {
    setLote({ ...lote, fk_finca: val });
  };

  const handleSelectVariedad = (val) => {
    setLote({ ...lote, fk_variedad: val });
  };

  const enviarLote = async () => {
    if (!lote.numero_arboles || !lote.fk_finca || !lote.fk_variedad) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (isNaN(lote.numero_arboles)) {
      Alert.alert('Error', 'El número de árboles debe ser un número');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Token no encontrado');
        return;
      }

      const headers = { token: token };

      const response = await axios.post(urlRegistro, lote, { headers });
      Alert.alert('Registro exitoso', 'Los datos han sido registrados correctamente');

      setLote({
        numero_arboles: '',
        fk_finca: '',
        fk_variedad: '',
        estado: 'activo',
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Ha ocurrido un error al registrar los datos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={require('../../assets/logoProyectoNegro.png')} />
        <Text style={styles.title}>Registrar Lotes</Text>
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            value={lote.numero_arboles}
            onChangeText={(numero_arboles) => setLote({ ...lote, numero_arboles })}
            placeholder="Número de árboles"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />
          <SelectList
            setSelected={handleSelectFinca}
            data={dataFincas}
            selected={lote.fk_finca}
            placeholder="Seleccione una finca"
            placeholderTextColor="#000"
            boxStyles={styles.selectBox}
            dropdownStyles={styles.selectDropdown}
          />
          <SelectList
            setSelected={handleSelectVariedad}
            data={dataVariedades}
            selected={lote.fk_variedad}
            placeholder="Seleccione una variedad"
            placeholderTextColor="#000"
            boxStyles={styles.selectBox}
            dropdownStyles={styles.selectDropdown}
          />
          <TextInput
            style={styles.input}
            value={lote.estado}
            onChangeText={(estado) => setLote({ ...lote, estado })}
            placeholder="Estado (activo/inactivo)"
            placeholderTextColor="#000"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={enviarLote}>
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

export default LotesModel;
