import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import { IP } from '../page/IP';

const FincaModel = () => {
  const [persona, setPersona] = useState({
    dimension_mt2: '',
    fk_caficultor: '',
    municipio:'',
    vereda:'',
  });

  const [dataCaficultores, setDataCaficultores] = useState([]);
  const [dataMunicipios, setDataMunicipios] = useState([]);

  const urlCaficultores = `http://${IP}:3000/usuarios/listar`;
  const urlMunicipios = `http://${IP}:3000/municipios/listar`;
  const url =`http://${IP}:3000/fincas/registrar`

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

  const enviarPersona = () => {
    if (!persona.dimension_mt2 || !persona.fk_caficultor || !persona.municipio || !persona.vereda) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
  
    if (isNaN(persona.dimension_mt2)) {
      Alert.alert('Error', 'La dimensión debe ser números');
      return;
    }
  
    if(isNaN(persona.fk_caficultor)) {
      Alert.alert('Error', 'El ID del caficultor debe ser un número');
      return;
    }
  
    if (/\d/.test(persona.vereda)) {
      Alert.alert('Error', 'La vereda no puede contener números');
      return;
    }
  
    axios.post(url, persona)
      .then((response) => {
        console.log(response.data);
        Alert.alert('Registro exitoso', 'La finca ha sido registrada correctamente');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Ha ocurrido un error al registrar la finca');
      });
  
    setPersona({
      dimension_mt2: '',
      fk_caficultor: '',
      municipio:'',
      vereda:'',
    });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer2}>
      <Text style={styles.title}>REGISTRAR</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dimension (mt2):</Text>
        <TextInput
          style={styles.input}
          value={persona.dimension_mt2}
          onChangeText={(dimension_mt2) => setPersona({ ...persona, dimension_mt2 })}
        />
      </View>
      <View style={styles.inputContainer3}>
        <Text style={styles.inputLabel2}>Caficultor:</Text>
        
        <SelectList 
          setSelected={handleSelectCaficultor} 
          data={dataCaficultores} 
          selected={persona.fk_caficultor} 
        />
      </View>
      <View style={styles.inputContainer3}>
        <Text style={styles.inputLabel2}>Municipio:</Text>
        <SelectList 
          setSelected={handleSelectMunicipio} 
          data={dataMunicipios}
          selected={persona.municipio} 
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Vereda:</Text>
        <TextInput
          style={styles.input}
          value={persona.vereda}
          onChangeText={(vereda) => setPersona({ ...persona, vereda })}
        />
      </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={enviarPersona}
      >
        <Text style={styles.buttonText}>Enviar datos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8B6A6',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    top:-29,
     textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

    width: '100%',
  },
  inputContainer3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    left:-20,
    width: 500,
  },
  inputContainer2: {
    backgroundColor: '#EBDCCC',
    height:500,
    width:360,
    borderRadius:15,
    marginTop:-120,
    paddingVertical:60,
  },
  inputLabel: {
    width: 120,
    marginRight: 10,
    left:20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputLabel2: {
    width: 120,
    marginRight: 10,
    left:40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    left:-20,
    borderColor: 'gray', 
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green', 
    paddingVertical: 10,
    width:200,
    borderRadius: 10,
    left:-75,
    bottom:-30,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  
  selectContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});


export default FincaModel;
