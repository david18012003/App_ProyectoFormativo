import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import axios from "axios";
import { IP } from "../page/IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

const AnalisisModel = ({ closeModal, title, userData, userId, data }) => {
  const [formData, setFormData] = useState({
    fecha: userData ? new Date(userData.fecha) : new Date(),
    analista: userData ? userData.analista : "",
    fk_muestra: userData ? Number(userData.muestra) : "",
    fk_tipo_analisis: userData ? userData.tipo_analisis : "",
    estado: userData ? userData.estado : "",
  });

  const [analistas, setAnalistas] = useState([]);
  const [muestras, setMuestras] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (title === "Actualizar" && userData) {
      setFormData({
        fecha: new Date(userData.fecha),
        analista: userData.analista,
        fk_muestra: Number(userData.muestra),
        fk_tipo_analisis: userData.tipo_analisis,
        estado: userData.estado === 'asignado' ? 1 : userData.estado === 'calificado' ? 2 : 3,
      });
    }
  }, [userData, title]);

  useEffect(() => {
    const fetchAnalistas = async () => {
      try {
        const response = await axios.get(`http://${IP}:3000/usuarios/listar`);
        setAnalistas(response.data.usuarios);
      } catch (error) {
        console.error("Error fetching analistas:", error);
        Alert.alert("Error al obtener los analistas. Por favor, revisa la consola para más detalles.");
      }
    };

    const fetchMuestras = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`http://${IP}:3000/muestras/listarMuestra`, {
          headers: { token }
        });
        setMuestras(response.data);
        console.log("muestras", response.data)
      } catch (error) {
        console.error("Error fetching muestras:", error);
        Alert.alert("Error al obtener las muestras. Por favor, revisa la consola para más detalles.");
      }
    };

    fetchAnalistas();
    fetchMuestras();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: name === "fk_muestra" ? Number(value) : value });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.fecha;
    setShowPicker(false);
    setFormData({ ...formData, fecha: currentDate });
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    try {
      const formattedData = { ...formData, fecha: formatDate(formData.fecha), estado: 1 };
      const baseURL = `http://${IP}:3000/analisis/registrar`;
      const token = await AsyncStorage.getItem("token");
      await axios.post(baseURL, formattedData, { headers: { token } });
      Alert.alert("Análisis registrado con éxito.");
      closeModal();
      data();
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error al registrar el análisis. Por favor, revisa la consola para más detalles."
      );
    }
  };

  const handleActualizar = async () => {
    try {
      const formattedData = { ...formData, fecha: formatDate(formData.fecha) };
      const token = await AsyncStorage.getItem("token");
      const baseURL = `http://${IP}:3000/analisis/actualizar/${userData.codigo}`;
      const response = await axios.put(baseURL, formattedData, {
        headers: { token },
      });
      console.log(formattedData);
      if (response.status === 201) {
        Alert.alert("Se actualizó con éxito el análisis");
        closeModal();
        data();
      } else {
        Alert.alert("Error al actualizar el análisis");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al actualizar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{title}</Text>

      <View style={styles.formulario}>
        <Text style={styles.etiqueta}>Fecha:</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.input}>{formData.fecha.toDateString()}</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={formData.fecha}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.etiqueta}>Analista:</Text>
        <RNPickerSelect
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{
            label: "Selecciona el analista",
            value: null,
          }}
          value={formData.analista}
          onValueChange={(value) => handleInputChange("analista", value)}
          items={analistas.map(analista => ({ label: analista.nombre, value: analista.identificacion }))}
        />

        <Text style={styles.etiqueta}>Número de muestra:</Text>
        <RNPickerSelect
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{
            label: "Selecciona el número de muestra",
            value: null,
          }}
          value={formData.fk_muestra}
          onValueChange={(value) => handleInputChange("fk_muestra", value)}
          items={muestras.map(muestra => ({ label: muestra.codigo.toString(), value: muestra.codigo }))}
        />

        <Text style={styles.etiqueta}>Tipo de análisis:</Text>
        <RNPickerSelect
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{
            label: "Selecciona el tipo de análisis",
            value: null,
          }}
          value={formData.fk_tipo_analisis}
          onValueChange={(value) => handleInputChange("fk_tipo_analisis", value)}
          items={[
            { label: "Físico", value: 1 },
            { label: "Sensorial", value: 2 },
          ]}
        />

        <Text style={styles.etiqueta}>Estado:</Text>
        <RNPickerSelect
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{
            label: "Selecciona el estado",
            value: null,
          }}
          value={formData.estado}
          onValueChange={(value) => handleInputChange("estado", value)}
          items={[
            { label: "Asignado", value: 1 },
            { label: "Calificado", value: 2 },
            { label: "Terminado", value: 3 },
          ]}
        />
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={title === "Registrar" ? handleSubmit : handleActualizar}
      >
        <Text style={styles.textoBoton}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  formulario: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    height: 40,
    borderColor: "#9c9c9c",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#000",
  },
  boton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: 40,
    width: 110,
    backgroundColor: "#336699",
    borderRadius: 5,
    alignSelf: "center",
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AnalisisModel;
