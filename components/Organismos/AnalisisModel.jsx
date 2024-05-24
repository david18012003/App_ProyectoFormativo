import React, { useEffect, useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity,Alert,} from "react-native";
import axios from "axios";
import { IP } from "../page/IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "@react-native-community/datetimepicker";

const AnalisisModel = ({ closeModal, title, data, userData, userId }) => {
  const [formData, setFormData] = useState({
    fecha: userData ? userData.fecha : "",
    cantidad: userData ? userData.cantidad : "",
    quien_recibe: userData ? userData.quien_recibe : "",
    proceso_fermentacion: userData ? userData.proceso_fermentacion : "",
    humedad_cafe: userData ? userData.humedad_cafe : "",
    altura_MSNM: userData ? userData.altura_MSNM : "",
    tipo_secado: userData ? userData.tipo_secado : "",
    observaciones: userData ? userData.observaciones : "",
    fk_lote: userData ? userData.fk_lote : "",
  });

  const [lotesOptions, SetLotesOptions] = useState([]);

  useEffect(() => {
    const fetchlotes = async () => {
      try {
        const response = await axios.get(`http://${IP}:3000/lotes/listar`);
        SetLotesOptions(response.data);
      } catch (error) {
        console.error("Error al cargar los lotes " + error);
      }
    };
    fetchlotes();
  }, []);

  useEffect(() => {
    if (title === "Actualizar" && userData) {
      setFormData({
        fecha: userData.fecha,
        cantidad: userData.cantidad,
        quien_recibe: userData.quien_recibe,
        proceso_fermentacion: userData.proceso_fermentacion,
        humedad_cafe: userData.humedad_cafe,
        altura_MSNM: userData.altura_MSNM,
        tipo_secado: userData.tipo_secado,
        observaciones: userData.observaciones,
        fk_lote: userData.fk_lote,
      });
    }
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const showDatePicker = async () => {
    try {
      const selectedDate = new Date(formData.fecha);
      DatePicker.showDatePicker(
        {
          date: selectedDate,
          mode: "date",
        },
        (event, date) => {
          if (event !== "dismissed") {
            setFormData({ ...formData, fecha: date });
          }
        }
      );
    } catch (error) {
      console.error("Cannot open date picker", error);
    }
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
        <Text style={styles.etiqueta}>fecha:</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.input}>{formData.fecha.toString()}</Text>
        </TouchableOpacity>

        <Text style={styles.etiqueta}>Cantidad:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.cantidad}
          onChangeText={(text) => handleInputChange("cantidad", text)}
          keyboardType="numeric"
          placeholder="Ingrese la cantidad"
        />
        <Text style={styles.etiqueta}>Quien recibe:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.quien_recibe}
          onChangeText={(text) => handleInputChange("quien_recibe", text)}
          placeholder="Ingrese quien recibe"
        />
        <Text style={styles.etiqueta}>proceso de fermentación:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.proceso_fermentacion}
          onChangeText={(text) =>
            handleInputChange("proceso_fermentacion", text)
          }
          placeholder="Ingresa el proceso de fermentación"
        />
        <Text style={styles.etiqueta}>Humedad del cafe:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.humedad_cafe}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange("humedad_cafe", text)}
          placeholder="Ingresavla humedad del cafe"
        />
        <Text style={styles.etiqueta}>Altura:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.altura_MSNM}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange("altura_MSNM", text)}
          placeholder="Ingresa la altura MSNM"
        />
        <Text style={styles.etiqueta}>tipo de secado</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.tipo_secado}
          onChangeText={(text) => handleInputChange("tipo_secado", text)}
          placeholder="Ingresa el tipo de secado"
        />
        <Text style={styles.etiqueta}>Observaciones:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.observaciones}
          onChangeText={(text) => handleInputChange("observaciones", text)}
          placeholder="Ingresa las observaciones"
        />

        <Text style={styles.etiqueta}>Numero de lote</Text>
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#000",
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
  pickerContainer: {
    flex: 1,
    borderRadius: 8,
    height: 40,
    borderColor: "#9c9c9c",
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
    marginStart: 110,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AnalisisModel;
