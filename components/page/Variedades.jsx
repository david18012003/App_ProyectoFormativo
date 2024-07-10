import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { IP } from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalVariedades from '../Modales/ModalVariedades';

const Variedades = () => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [viewModal, setViewModal] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);

    const ip = IP;

    const vista = (accion, userData, userId) => {
        setTituloModal(accion);
        setViewModal(!viewModal);
        setUserData(userData);
        setUserId(userId);
    };

    const fetchData = async () => {
        try {
            const baseURL = `http://${ip}:3000/variedades/listar`;
            const tokenAsync = await AsyncStorage.getItem('token');
            const response = await axios.get(baseURL, { headers: { token: tokenAsync } });

            if (response.data && response.data.length > 0) {
                const dataWithIds = response.data.map((variedad, index) => ({
                    id: index + 1,
                    codigo: variedad.codigo,
                    nombre: variedad.nombre,
                    estado: variedad.estado
                }));
                setOriginalData(dataWithIds);
                setFilteredData(dataWithIds);
            } else {
                console.log('La respuesta está vacía o no es un arreglo válido');
            }
        } catch (error) {
            console.error('Error al obtener datos:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let filteredVariedades = originalData;

        if (searchTerm) {
            filteredVariedades = filteredVariedades.filter(variedad =>
                Object.values(variedad).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (selectedStatus) {
            filteredVariedades = filteredVariedades.filter(variedad => {
                return selectedStatus === '' || 
                       (selectedStatus === 'activo' && variedad.estado === 'activo') || 
                       (selectedStatus === 'inactivo' && variedad.estado === 'inactivo');
            });
        }

        setFilteredData(filteredVariedades);
    }, [searchTerm, selectedStatus, originalData]);

    const handleActionButton = async (codigoId, estado) => {
        try {
            const token = await AsyncStorage.getItem('token');
            let baseURL, successMessage, newEstado;

            if (estado === 'activo') { // Si está activo, lo desactiva
                baseURL = `http://${ip}:3000/variedades/desactivar/${codigoId}`;
                successMessage = 'Variedad desactivada con éxito';
                newEstado = 'inactivo';
            } else { // Si está inactivo, lo activa
                baseURL = `http://${ip}:3000/variedades/activar/${codigoId}`;
                successMessage = 'Variedad activada con éxito';
                newEstado = 'activo';
            }

            const response = await axios.put(baseURL, null, { headers: { token } });
            if (response.status === 200) {
                Alert.alert(successMessage);
                const updatedData = originalData.map(variedad =>
                    variedad.codigo === codigoId ? { ...variedad, estado: newEstado } : variedad
                );
                setOriginalData(updatedData);
                setFilteredData(updatedData);
            } else {
                console.error('Error al cambiar el estado:', response.status);
                Alert.alert('Error al cambiar el estado de la variedad');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al realizar la acción');
        }
    };

    return (
        <>
            <HeaderPrincipal title='Variedades' />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.selectContainer}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#999"
                            placeholder="Buscar variedad"
                            onChangeText={setSearchTerm}
                            value={searchTerm}
                        />
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedStatus(value)}
                                placeholder={{ label: "Estado", value: '' }}
                                items={[
                                    { label: 'activo', value: 'activo' },
                                    { label: 'inactivo', value: 'inactivo' },
                                ]}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    {filteredData.map((variedad) => (
                        <View key={variedad.codigo} style={styles.userContainer}>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Código:</Text>
                                <Text style={[styles.value, { color: '#000' }]}>{variedad.codigo}</Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Nombre:</Text>
                                <Text style={[styles.value, { color: '#000' }]}>{variedad.nombre}</Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Estado:</Text>
                                <Text style={[styles.value, variedad.estado === 'activo' ? styles.activo : styles.inactivo]}>
                                    {variedad.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                </Text>
                            </View>
                            <View style={styles.contenedorBtn}>
                                <View style={styles.itemContainer}>
                                    <TouchableOpacity onPress={() => vista('Actualizar', variedad, variedad.codigo)} style={styles.button}>
                                        <Text style={styles.actualizar}>Actualizar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainerD}>
                                    <TouchableOpacity onPress={() => handleActionButton(variedad.codigo, variedad.estado)} style={[styles.button, { backgroundColor: variedad.estado === 'activo' ? '#FF6347' : '#6495ED' }]}>
                                        <Text style={styles.actualizar}>{variedad.estado === 'activo' ? 'Desactivar' : 'Activar'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.addButton}>
                    <TouchableOpacity onPress={() => vista('Registrar')}>
                        <Image source={require('../../assets/mas.png')} style={styles.addButtonText} />
                    </TouchableOpacity>
                </View>
                <ModalVariedades visible={viewModal} onClose={vista} title={tituloModal} data={fetchData} userData={userData} userId={userId} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    activo: {
        color: 'green',
    },
    inactivo: {
        color: 'red',
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#fff",
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
        color: "#000",
    },
    buttonContainerD: {
        alignContent:'flex-end',
        margin:10,
    },
    key: {
        fontWeight: 'bold',
        marginRight: 5,
        color: "#000",
    },
    value: {},
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
        color: "#000",
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#9c9c9c',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 10,
        color: '#000'
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
        color: "#000",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    actualizar: {
        color: "#fff",
    },
    contenedorBtn:{
        flexDirection:'row',
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
    buttonCalificar: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20, 
        backgroundColor:"#336699", 
        borderRadius:50, 
        height:40, 
        width:40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    addButtonText: {
        width:50,
        height:50,
    }
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
        color: '#fff',
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

export default Variedades;
