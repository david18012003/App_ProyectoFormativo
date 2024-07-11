import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { IP } from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAnalisis from '../Modales/ModalAnalisis';

const Analisis = () => {
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
            const baseURL = `http://${ip}:3000/analisis/listar`;
            const tokenAsync = await AsyncStorage.getItem('token');
            const response = await axios.get(baseURL, { headers: { token: tokenAsync } });
            const dataWithIds = response.data.map((analisis, index) => ({
                id: index + 1,
                codigo: analisis.codigo,
                fecha: formatDate(analisis.fecha),
                analista: analisis.analista,
                muestra: analisis.muestra,
                tipo_analisis: analisis.tipo_analisis,
                estado: analisis.estado
            }));
            setOriginalData(dataWithIds);
            setFilteredData(dataWithIds);
        } catch (error) {
            console.error('Error al obtener datos:', error.message);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let filteredMuestras = originalData;

        if (searchTerm) {
            filteredMuestras = filteredMuestras.filter(muestra =>
                Object.values(muestra).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (selectedStatus) {
            filteredMuestras = filteredMuestras.filter(muestra => {
                switch (selectedStatus) {
                    case 'asignado':
                        return muestra.estado === 'asignado';
                    case 'calificado':
                        return muestra.estado === 'calificado';
                    case 'terminado':
                        return muestra.estado === 'terminado';
                    default:
                        return true; // Return true for all other cases or when selectedStatus is null
                }
            });
        }

        setFilteredData(filteredMuestras);
    }, [searchTerm, selectedStatus, originalData]);

    const handleActivateDeactivate = async (codigoId, currentStatus) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const action = currentStatus === 'asignado' ? 'desactivar' : 'activar';
            const baseURL = `http://${ip}:3000/analisis/${action}/${codigoId}`;
            const response = await axios.put(baseURL, null, { headers: { token: token } });

            if (response.status === 200) {
                const mensaje = response.data.message;
                Alert.alert(mensaje);
                fetchData();
            } else {
                console.error(`Error al ${action} muestra:`, response.status);
                Alert.alert(`Error al ${action} muestra`);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al realizar la acción');
        }
    };

    const handleCalificar = async (codigoId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const baseURL = `http://${ip}:3000/analisis/calificar/${codigoId}`;
            const response = await axios.put(baseURL, null, { headers: { token: token } });

            if (response.status === 200) {
                const mensaje = response.data.message;
                Alert.alert(mensaje);
                fetchData();
            } else {
                console.error('Error al calificar:', response.status);
                Alert.alert('Error al calificar la muestra');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al realizar la acción');
        }
    };

    return (
        <>
            <HeaderPrincipal title='Análisis' />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.selectContainer}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#999"
                            placeholder="Buscar muestra"
                            onChangeText={setSearchTerm}
                            value={searchTerm}
                        />
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedStatus(value)}
                                placeholder={{ label: "Estado", value: null }}
                                items={[
                                    { label: 'Asignado', value: 'asignado' },
                                    { label: 'Calificado', value: 'calificado' },
                                    { label: 'Terminado', value: 'terminado' },
                                ]}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    {filteredData.map((analisis) => (
                        <View key={analisis.codigo} style={styles.userContainer}>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Código muestra:</Text>
                                <Text style={[styles.value, { color: '#000' }]}>{analisis.codigo}</Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Fecha:</Text>
                                <Text style={[styles.value, { color: '#000' }]}>{analisis.fecha}</Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Analista:</Text>
                                <Text style={[styles.value, { color: '#000' }]}>{analisis.analista}</Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Muestra:</Text>
                                <Text style={[styles.value, { color: '#000' }]}>{analisis.muestra}</Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Tipo Análisis:</Text>
                                <Text style={[styles.value, { color: '#000' }]}>{analisis.tipo_analisis}</Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.key}>Estado:</Text>
                                <Text style={[styles.value, analisis.estado === 'asignado' ? styles.asignado : (analisis.estado === 'calificado' ? styles.calificado : styles.terminado)]}>
                                    {analisis.estado}
                                </Text>
                            </View>
                            <View style={styles.contenedorBtn}>
                                <View style={styles.itemContainer}>
                                    <TouchableOpacity onPress={() => vista('Actualizar', analisis, analisis.codigo)} style={styles.button}>
                                        <Text style={styles.actualizar}>Actualizar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainerD}>
                                    <TouchableOpacity onPress={() => handleActivateDeactivate(analisis.codigo, analisis.estado)} style={styles.button}>
                                        <Text style={styles.actualizar}>{analisis.estado === 'asignado' ? 'Terminar' : 'Asignar'}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainerD}>
                                    <TouchableOpacity onPress={() => handleCalificar(analisis.codigo)} style={styles.buttonCalificar}>
                                        <Text style={styles.actualizar}>Calificar</Text>
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
                <ModalAnalisis visible={viewModal} onClose={vista} title={tituloModal} data={fetchData} userData={userData} userId={userId} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    asignado: {
        color: 'blue',
    },
    calificado: {
        color: 'orange',
    },
    terminado: {
        color: 'green',
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

export default Analisis;
