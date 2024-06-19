import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { IP } from './IP';
import HeaderPrincipal from '../Modales/HeaderPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAnalisis from '../Modales/ModalAnalisis';
import { useFocusEffect } from '@react-navigation/native';
import { sharedStyles } from '../../public/Colores';

const Analisis = () => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [viewModal, setViewModal] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const mode = async () => {
        try {
            const storedMode = await AsyncStorage.getItem('isDarkMode');
            if (storedMode !== null) {
                setIsDarkMode(JSON.parse(storedMode));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            mode();
        }, [])
    );

    const ip = IP;

    const vista = (accion, userData, userId) => {
        setTituloModal(accion);
        setViewModal(!viewModal);
        setUserData(userData);
        setUserId(userId);
    };

    const fetchData = async () => {
        try {
            const baseURL = `${ip}/analisis/listar`;
            const tokenAsyng = await AsyncStorage.getItem('token');
            const response = await axios.get(baseURL, { headers: { token: tokenAsyng } });
            console.log(response.data);
            if (response.data && response.data.length > 0) {
                console.log('datos cargados con exito');
            } else {
                console.log('La respuesta está vacía o no es un arreglo válido');
            }
            const dataWithIds = response.data.map((analisis, index) => ({
                id: index + 1,  // Cambié "codigo" por "id" para evitar duplicados
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

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        fetchData();
        return () => {
            // Cleanup if needed
        };
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
            filteredMuestras = filteredMuestras.filter(muestra => muestra.estado === selectedStatus);
        }

        setFilteredData(filteredMuestras);
    }, [searchTerm, selectedStatus, originalData]);

    const handleDesactivar = async (codigoId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const baseURL = `${ip}/analisis/desactivar/${codigoId}`;
            const response = await axios.put(baseURL, null, { headers: { token: token } });

            if (response.status === 200) {
                const mensaje = response.data.message;
                Alert.alert(mensaje);
                fetchData();
            } else {
                console.error('Error:', response.status);
                Alert.alert('Error al desactivar la muestra');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al desactivar la muestra');
        }

    };

    const handleActivar = async (codigoId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const baseURL = `${ip}/analisis/activar/${codigoId}`;
            const response = await axios.put(baseURL, null, { headers: { token: token } });

            if (response.status === 200) {
                const mensaje = response.data.message;
                Alert.alert(mensaje);
                fetchData();
            } else {
                console.error('Error:', response.status);
                Alert.alert('Error al activar la muestra');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error al activar la muestra');
        }
    };

    return (
        <>
            <HeaderPrincipal title='Analisis' />
            <View style={[sharedStyles.container, !isDarkMode ? sharedStyles.conteinerNoche : sharedStyles.conteinerDia]}>
                <View style={sharedStyles.inputContainer}>
                    <View style={sharedStyles.selectContainer}>
                        <TextInput
                            style={sharedStyles.input}
                            placeholderTextColor="#999"
                            placeholder="Buscar muestra"
                            onChangeText={setSearchTerm}
                            value={searchTerm}
                        />
                        <View style={sharedStyles.pickerContainer1}>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedStatus(value)}
                                placeholder={{ label: "Estado", value: null }}
                                items={[
                                    { label: 'Activo', value: 'activo' },
                                    { label: 'Inactivo', value: 'inactivo' },
                                ]}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView style={sharedStyles.scrollView}>
                    {filteredData.map((analisis) => (
                        <View key={analisis.id} style={[sharedStyles.userContainer, !isDarkMode ? sharedStyles.conteinerDia : sharedStyles.conteinerNoche]}>
                            <View style={sharedStyles.itemContainer}>
                                <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Código muestra:</Text>
                                <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{analisis.codigo}</Text>
                            </View>
                            <View style={sharedStyles.itemContainer}>
                                <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Fecha:</Text>
                                <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{analisis.fecha}</Text>
                            </View>
                            <View style={sharedStyles.itemContainer}>
                                <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Analista:</Text>
                                <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{analisis.analista}</Text>
                            </View>
                            <View style={sharedStyles.itemContainer}>
                                <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Muestra:</Text>
                                <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{analisis.muestra}</Text>
                            </View>
                            <View style={sharedStyles.itemContainer}>
                                <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Tipo Analisis:</Text>
                                <Text style={[sharedStyles.value, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>{analisis.tipo_analisis}</Text>
                            </View>
                            <View style={sharedStyles.itemContainer}>
                                <Text style={[sharedStyles.key, !isDarkMode ? sharedStyles.dia : sharedStyles.noche]}>Estado:</Text>
                                <Text style={[sharedStyles.value, analisis.estado === 'activo' ? sharedStyles.active : sharedStyles.inactive]}>
                                    {analisis.estado}
                                </Text>
                            </View>
                            <View style={sharedStyles.contenedorBtn}>
                                <View style={sharedStyles.itemContainer}>
                                    <TouchableOpacity onPress={() => vista('Actualizar', analisis, analisis.codigo)} style={sharedStyles.button}>
                                        <Text style={sharedStyles.actualizar}>Actualizar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={sharedStyles.buttonContainerD}>
                                    <TouchableOpacity onPress={() => analisis.estado === 'activo' ? handleDesactivar(analisis.codigo) : handleActivar(analisis.codigo)} style={analisis.estado === 'activo' ? sharedStyles.buttonD : sharedStyles.buttonDa}>
                                        <Text style={sharedStyles.actualizar}>{analisis.estado === 'activo' ? 'Desactivar' : 'Activar'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={sharedStyles.addButton}>
                    <TouchableOpacity onPress={() => vista('Registrar')}>
                        <Image source={require('../../assets/mas.png')} style={sharedStyles.addImage} />
                    </TouchableOpacity>
                </View>
                <ModalAnalisis visible={viewModal} onClose={vista} title={tituloModal} data={fetchData} userData={userData} userId={userId} />
            </View>
        </>
    );
};

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

export default Analisis;
