import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { IP } from "../page/IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker"

const MuestraModel = ({ closeModal, title, data, userData, userId }) => {
  const [formData, setFormData] = useState({
    fecha: userData ? userData.fecha : "",
    tipo_molienda: userData ? userData.tipo_molienda : "",
    densidad_cafe: userData ? userData.densidad_cafe : "",
    proceso_fermentacion: userData ? userData.proceso_fermentacion : "",
    tipo_tostion: userData ? userData.tipo_tostion : "",
    altura_MSNM: userData ? userData.altura_MSNM : "",
    tiempo_fermentacion: userData ? userData.tiempo_fermentacion : "",
    actividad_agua: userData ? userData.actividad_agua : "",
    tiempo_secado: userData ? userData.tiempo_secado : "",
    presentacion: userData ? userData.presentacion : "",
    fk_lote: userData ? userData.fk_lote : "",
  });

  const [lotesOptions, SetLotesOptions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  
  useEffect(() => {
    const fetchLotes = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`http://${IP}:3000/lotes/listar`, {
                headers: { token: token }
            });
            SetLotesOptions(response.data);
        } catch (error) {
            console.error("Error al cargar los lotes " + error);
        }
    };
    fetchLotes();
}, []);


  useEffect(() => {
    if (title === "Actualizar" && userData) {
      setFormData({
        fecha: userData.fecha,
        tipo_molienda: userData.tipo_molienda,
        densidad_cafe: userData.densidad_cafe,
        proceso_fermentacion: userData.proceso_fermentacion,
        tipo_tostion: userData.tipo_tostion,
        altura_MSNM: userData.altura_MSNM,
        tiempo_fermentacion: userData.tiempo_fermentacion,
        actividad_agua: userData.actividad_agua,
        tiempo_secado: userData.tiempo_secado,
        presentacion: userData.presentacion,
        fk_lote: userData.fk_lote,
      });
    }
  }, [title, userData]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setFormData({ ...formData, fecha: currentDate.toISOString().split('T')[0] });
  };

  const handleSubmit = async () => {
    try {
      const baseURL = `http://${IP}:3000/muestras/crearMuestra`;
      const token = await AsyncStorage.getItem("token");
      await axios.post(baseURL, formData, { headers: { token: token } });
      Alert.alert("Muestra registrada con éxito.");
      closeModal();
      data();
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error al registrar la muestra. Por favor, revisa la consola para más detalles."
      );
    }
  };

  const handleActualizar = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const baseURL = `http://${IP}:3000/muestras/actualizarMuestra/${userId}`;
      const response = await axios.put(baseURL, formData, {
        headers: { token: token },
      });
      console.log(formData);
      if (response.status === 200) {
        Alert.alert("Se actualizó con éxito la muestra");
        closeModal();
        data();
      } else {
        Alert.alert("Error al actualizar la muestra");
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
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.input}>{formData.fecha}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
          value = {date}
          mode = "date"
          display = "default"
          onChange = {handleDateChange}
          />
        )}

        <Text style={styles.etiqueta}>Tipo de Molienda:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.tipo_molienda}
          onChangeText={(text) => handleInputChange("tipo_molienda", text)}
          placeholder="Ingrese el tipo de molienda"
        />

        <Text style={styles.etiqueta}>Densidad del Café:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.densidad_cafe}
          onChangeText={(text) => handleInputChange("densidad_cafe", text)}
          placeholder="Ingrese la densidad del café"
        />

        <Text style={styles.etiqueta}>Proceso de Fermentación:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.proceso_fermentacion}
          onChangeText={(text) =>
            handleInputChange("proceso_fermentacion", text)
          }
          placeholder="Ingrese el proceso de fermentación"
        />

        <Text style={styles.etiqueta}>Tipo de Tostión:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.tipo_tostion}
          onChangeText={(text) => handleInputChange("tipo_tostion", text)}
          placeholder="Ingrese el tipo de tostión"
        />

        <Text style={styles.etiqueta}>Altura MSNM:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.altura_MSNM}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange("altura_MSNM", text)}
          placeholder="Ingrese la altura MSNM"
        />

        <Text style={styles.etiqueta}>Tiempo de Fermentación:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.tiempo_fermentacion}

          onChangeText={(text) => handleInputChange("tiempo_fermentacion", text)}
          placeholder="Ingrese el tiempo de fermentación"
        />

        <Text style={styles.etiqueta}>Actividad del Agua:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.actividad_agua}
          onChangeText={(text) => handleInputChange("actividad_agua", text)}
          placeholder="Ingrese la actividad del agua"
        />

        <Text style={styles.etiqueta}>Tiempo de Secado:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.tiempo_secado}
          onChangeText={(text) => handleInputChange("tiempo_secado", text)}
          placeholder="Ingrese el tiempo de secado"
        />

        <Text style={styles.etiqueta}>Presentación:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.presentacion}
          onChangeText={(text) => handleInputChange("presentacion", text)}
          placeholder="Ingrese la presentación"
        />

        <Text style={styles.etiqueta}>Número de Lote:</Text>
        <RNPickerSelect
          style={styles.input}
          keyboardType="numeric"
          value={formData.fk_lote}
          onValueChange={(itemValue) => handleInputChange("fk_lote", itemValue)}
          items={
            lotesOptions.length > 0 &&
            lotesOptions.map((lote) => ({
              label: lote.codigo,
              value: lote.codigo,
            }))
          }
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
    padding: 20,
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

export default MuestraModel;
