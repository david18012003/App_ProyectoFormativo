import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { IP } from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';

const Usuario = () => {
  const navigation = useNavigation();

  const [userModalVisible, setUserModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [fincas, setFincas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fincaModalVisible, setFincaModalVisible] = useState(false);
  const [selectedFincaCode, setSelectedFincaCode] = useState('');
  const [lotes, setLotes] = useState([]);
  const [lotesLoading, setLotesLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchFincas(parsedUser.identificacion);
      }
    };
    fetchUserData();
  }, []);

  const fetchFincas = async (identificacion) => {
    setLoading(true);
    try {
      const url =` ${IP}/fincas/buscarFincaCaficultor/${identificacion};`
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(url, { headers: { token: token } });
      if (response.status === 200) {
        setFincas(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserButtonPress = () => {
    setUserModalVisible(true);
  };

  const handleCloseUserModal = () => {
    setUserModalVisible(false);
  };

  const handleFincaButtonPress = async (codigo) => {
    setSelectedFincaCode(codigo);
    setLotesLoading(true);
    try {
      const url = `${IP}/lotes/buscarFincaId/${codigo}`;
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(url, { headers: { token: token } });
      if (response.status === 200) {
        setLotes(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLotesLoading(false);
      setFincaModalVisible(true);
    }
  };

  const handleCloseFincaModal = () => {
    setFincaModalVisible(false);
    setLotes([]);
  };

  const renderFincaItem = ({ item }) => (
    <View style={styles.contenedorItem}>
      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Nombre:</Text>
        <Text style={styles.valor}>{item.nombre_finca}</Text>
      </View>
      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Dimensión (mt2):</Text>
        <Text style={styles.valor}>{item.dimension_mt2}</Text>
      </View>
      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Municipio:</Text>
        <Text style={styles.valor}>{item.municipio}</Text>
      </View>
      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Vereda:</Text>
        <Text style={styles.valor}>{item.vereda}</Text>
      </View>
      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Estado:</Text>
        <Text style={styles.valor}>{item.estado}</Text>
      </View>
      <TouchableOpacity style={styles.botonFinca} onPress={() => handleFincaButtonPress(item.codigo)}>
        <Text style={styles.textoBotonFinca}>Ver Lotes</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.fondoDatos}>
        <View style={styles.contenedorImagen}>
          <Image source={require('../../assets/PerfilAzul.png')} style={styles.imagen} />
        </View>
        <View style={styles.contenedorUsuario}>
          {user && <Text style={styles.nombreUsuario}>{user.nombre}</Text>}
          {user && <Text style={styles.tipoUsuario}>{user.tipo_usuario}</Text>}
          {user && <Text style={styles.correoUsuario}>{user.correo_electronico}</Text>}
          <TouchableOpacity style={styles.botonDetallesUsuario} onPress={handleUserButtonPress}>
            <Text style={styles.textoBotonDetallesUsuario}>Ver todos tus datos</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fincaUsuario}>
        <Text style={styles.tituloFincaUsuario}>Tus Fincas</Text>
      </View>
    </View>
  );

  const renderLoteItem = ({ item }) => (
    <View style={styles.contenedorLoteItem}>
      <Text style={styles.textoLote}><Text style={styles.negrita}>Código:</Text> {item.codigo}</Text>
      <Text style={styles.textoLote}><Text style={styles.negrita}>Número de Árboles:</Text> {item.numero_arboles}</Text>
      <Text style={styles.textoLote}><Text style={styles.negrita}>Variedad:</Text> {item.fk_variedad}</Text>
      <Text style={styles.textoLote}><Text style={styles.negrita}>Estado:</Text> {item.estado}</Text>
    </View>
  );

  return (
  <>
  <HeaderPrincipal title='caficultor'/>
    <View style={styles.fondoTodo}>
      

      <FlatList
        data={fincas}
        renderItem={renderFincaItem}
        keyExtractor={(item) => item.codigo.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          loading ? <Text style={styles.textoCargando}>Cargando....</Text> : <Text style={styles.textoCargando}>No tienes fincas registradas</Text>
        )}
      />

      <Modal
        transparent={true}
        animationType="slide"
        visible={userModalVisible}
        onRequestClose={handleCloseUserModal}
      >
        <View style={styles.fondoModal}>
          <View style={styles.contenedorModal}>
            <Text style={styles.tituloModal}>Todos tus datos</Text>
            {user && (
              <View>
                <Text style={styles.textoModal}>Cédula: {user.identificacion}</Text>
                <Text style={styles.textoModal}>Teléfono: {user.telefono}</Text>
                <Text style={styles.textoModal}>Nombre: {user.nombre}</Text>
                <Text style={styles.textoModal}>Correo: {user.correo_electronico}</Text>
                <Text style={styles.textoModal}>Tipo de Usuario: {user.tipo_usuario}</Text>
              </View>
            )}
            <Button title="Cerrar" onPress={handleCloseUserModal} />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="slide"
        visible={fincaModalVisible}
        onRequestClose={handleCloseFincaModal}
      >
        <View style={styles.fondoModal}>
          <View style={styles.contenedorModal}>
            <Text style={styles.tituloModal}>Lotes de la Finca</Text>
            {lotesLoading ? (
              <Text style={styles.textoCargando}>Cargando lotes...</Text>
            ) : (
              <FlatList
                data={lotes}
                renderItem={renderLoteItem}
                keyExtractor={(item) => item.codigo.toString()}
                ListEmptyComponent={() => (
                  <Text style={styles.textoCargando}>No se encontraron lotes</Text>
                )}
              />
            )}
            {lotes.length === 0 && !lotesLoading && (
              <Text style={styles.textoCargando}>No tienes lotes asociadas</Text>
            )}
            <Button title="Cerrar" onPress={handleCloseFincaModal} />
          </View>
        </View>
      </Modal>
    </View>
  </>
);
};

export default Usuario;

const styles = StyleSheet.create({
  fondoDatos: {
    backgroundColor: '#F0F8FF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection:'row',
  },
  fondoTodo: {
    padding: 15,
    backgroundColor: '#ABC4FF',
    height: '100%',
  },
  fincaUsuario: {
    alignItems: 'center',
    marginTop: 20,
  },
  tituloFincaUsuario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  nombreUsuario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  tipoUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  correoUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  contenedorUsuario: {
    alignItems: 'center',
    marginTop: 10,
  },
  contenedorImagen: {
    marginBottom: 20,
    width: 100,
    height: 100,
  },
  imagen: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  botonDetallesUsuario: {
    marginTop: 10,
    width: 200,
    height: 50,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#28C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textoBotonDetallesUsuario: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contenedorModal: {
    width: 300,
    padding: 20,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    alignItems: 'center',
  },
  tituloModal: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoModal: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  textoCargando: {
    fontSize: 18,
    marginVertical: 20,
    color: '#000',
  },
  contenedorItem: {
    marginVertical: 9,
    paddingHorizontal: 7,
    paddingVertical: 10,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ABC4FF',
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  etiqueta: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  valor: {
    color: '#000',
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  botonFinca: {
    backgroundColor: '#28C8FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotonFinca: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenedorLoteItem: {
    marginVertical: 5,
    paddingHorizontal: 7,
    paddingVertical: 10,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ABC4FF',
  },
  textoLote: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  negrita: {
    fontWeight: 'bold',
  }})