// Código corregido y mejorado
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import {IP} from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalVariables from '../Modales/ModalVariables';

const ListarVariables = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewModal, setViewModal] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [TipoAnalisisOptions, SetTipoAnalisiOptions] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    fk_tipo_analisis: null,
  });

  const ip = IP;

  const vista = (accion, userData, userId) => {
    setTituloModal(accion);
    setViewModal(!viewModal);
    setUserData(userData);
    setUserId(userId);
  };

  const fetchData = async () => {
    try {
      const baseURL = `http://${ip}:3000/variables/listarvariable`;
      const tokenAsyng = await AsyncStorage.getItem('token');
      const response = await axios.get(baseURL, {headers: {token: tokenAsyng}});

      const dataWithIds = response.data.map((variable, index) => ({
        v_codigo: index + 1,
        v_codigo: variable.v_codigo,
        nombre: variable.nombre,
        tipo_analisis: variable.tipo_analisis,
        estado: variable.estado,
      }));

      setOriginalData(dataWithIds);
      setFilteredData(dataWithIds);
    } catch (error) {
      console.error('Error al obtener datos:', error.message);
    }
  };

  useEffect(() => {
    const fetchTipoAnalisis = async () => {
      try {
        const response = await axios.get(
          `http://${IP}:3000/tipoanalisis/listar`,
        );
        SetTipoAnalisiOptions(response.data);
      } catch (error) {
        console.error('Error al cargar los análisis ' + error);
      }
    };
    fetchTipoAnalisis();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filteredVariables = originalData;

    if (searchTerm) {
      filteredVariables = filteredVariables.filter(variable =>
        Object.values(variable).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    if (selectedStatus) {
      filteredVariables = filteredVariables.filter(
        variable => variable.estado === selectedStatus,
      );
    }

    setFilteredData(filteredVariables);
  }, [searchTerm, selectedTipo, selectedStatus, originalData]);

  useEffect(() => {
    let filteredVariables = originalData;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filteredVariables = filteredVariables.filter(variable =>
        Object.values(variable).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    // Filtrar por tipo de análisis
    if (selectedTipo) {
      filteredVariables = filteredVariables.filter(
        variable => variable.tipo_analisis === selectedTipo,
      );
    }

    // Filtrar por estado
    if (selectedStatus) {
      filteredVariables = filteredVariables.filter(
        variable => variable.estado === selectedStatus,
      );
    }

    setFilteredData(filteredVariables);
  }, [searchTerm, selectedTipo, selectedStatus, originalData]);

  const handleDesactivar = async userId => {
    try {
      const token = await AsyncStorage.getItem('token');
      const baseURL = `http://${ip}:3000/variables/desactivarVariable/${userId}`;
      const response = await axios.put(baseURL, null, {
        headers: {token: token},
      });

      if (response.status === 200) {
        const mensaje = response.data.message;
        console.log('Ente es el mensaje', mensaje);
        Alert.alert(mensaje);
        fetchData();
      } else {
        console.error('Error:', response.status);
        Alert.alert('Error al desactivar la variable');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error al desactivar la variable');
    }
  };

  const handleActivar = async userId => {
    try {
      const token = await AsyncStorage.getItem('token');
      const baseURL = `http://${ip}:3000/variables/activarVariable/${userId}`;
      const response = await axios.put(baseURL, null, {
        headers: {token: token},
      });

      if (response.status === 200) {
        const mensaje = response.data.message;
        console.log('Ente es el mensaje', mensaje);
        Alert.alert(mensaje);
        fetchData();
      } else {
        console.error('Error:', response.status);
        Alert.alert('Error al activar la variable');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error al activar la variable');
    }
  };

  const getTipoAnalisisNombre = id => {
    const tipoAnalisis = TipoAnalisisOptions.find(option => option.id === id);
    return tipoAnalisis ? tipoAnalisis.tipo_analisis : 'No definido';
  };

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  return (
    <>
      <HeaderPrincipal title="Variables" />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.selectContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#999"
              placeholder="Buscar variable"
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                onValueChange={itemValue => setSelectedTipo(itemValue)}
                value={selectedTipo} 
                placeholder={{label: 'Tipo', value: null}} 
                items={
                  TipoAnalisisOptions.length > 0 &&
                  TipoAnalisisOptions.map(tipo_analisis => ({
                    label: tipo_analisis.tipo_analisis,
                    value: tipo_analisis.id,
                    key: tipo_analisis.id.toString(),
                  }))
                }
              />
            </View>
            <View style={styles.pickerContainer}>
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
        </View>
        <ScrollView style={styles.scrollView}>
          {filteredData.map(variable => (
            <View key={variable.v_codigo} style={styles.userContainer}>
              <View style={styles.itemContainer}>
                <Text style={styles.key}>Código Variable:</Text>
                <Text style={[styles.value, {color: '#000'}]}>
                  {variable.v_codigo}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.key}>Nombre:</Text>
                <Text style={[styles.value, {color: '#000'}]}>
                  {variable.nombre}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.key}>Tipo de análisis:</Text>
                <Text style={[styles.value, {color: '#000'}]}>
                  {getTipoAnalisisNombre(variable.tipo_analisis)}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.key}>Estado:</Text>
                <Text
                  style={[
                    styles.value,
                    variable.estado === 'activo'
                      ? styles.active
                      : styles.inactive,
                  ]}>
                  {variable.estado}
                </Text>
              </View>
              <View style={styles.contenedorBtn}>
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      vista('Actualizar', variable, variable.v_codigo)
                    }
                    style={styles.button}>
                    <Text style={styles.actualizar}>Actualizar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainerD}>
                  <TouchableOpacity
                    onPress={() =>
                      variable.estado === 'activo'
                        ? handleDesactivar(variable.v_codigo)
                        : handleActivar(variable.v_codigo)
                    }
                    style={[
                      variable.estado === 'activo'
                        ? styles.buttonD
                        : styles.buttonDa,
                    ]}>
                    <Text style={styles.actualizar}>
                      {variable.estado === 'activo' ? 'Desactivar' : 'Activar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.addButton}>
          <TouchableOpacity onPress={() => vista('Registrar')}>
            <Image
              style={styles.addImage}
              source={require('../../assets/mas.png')}
            />
          </TouchableOpacity>
        </View>
        <ModalVariables
          visible={viewModal}
          onClose={vista}
          title={tituloModal}
          data={fetchData}
          userData={userData}
          userId={userId}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  active: {
    color: 'green',
  },
  inactive: {
    color: 'red',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  userContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#d4d4d4',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    color: '#000',
  },
  buttonContainerD: {
    alignContent: 'flex-end',
    margin: 10,
  },
  key: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#000',
  },
  value: {},
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    color: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#9c9c9c',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#000',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 8,
    height: 40,
    borderColor: '#9c9c9c',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0083FF',
    color: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  actualizar: {
    color: '#fff',
  },
  contenedorBtn: {
    flexDirection: 'row',
  },
  buttonD: {
    backgroundColor: '#FF3200',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDa: {
    backgroundColor: '#039B1E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#336699',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImage: {
    width: 50,
    height: 50,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#9c9c9c',
    borderRadius: 10,
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
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#A3DBEE',
    marginBottom: 5,
    marginRight: 8,
  },
  placeholder: {
    color: '#000',
    fontSize: 14,
    paddingHorizontal: 10,
  },
});

export default ListarVariables;
