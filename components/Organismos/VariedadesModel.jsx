import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { IP } from "../page/IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "@react-native-community/datetimepicker";

const VariedadesModel = ({ closeModal, title, userData, userId, data }) => {
  const [formData, setFormData] = useState({
    nombre: userData ? userData.nombre : "",
    estado: userData ? userData.estado : 1,
  });

  useEffect(() => {
    if (title === "Actualizar" && userData) {
      setFormData({
        nombre: userData.nombre,
        estado: userData.estado,
      });
    }
  }, [userData, title]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const baseURL = `http://${IP}:3000/variedades/registrar`;
      const token = await AsyncStorage.getItem("token");
      await axios.post(baseURL, formData, { headers: { token } });
      Alert.alert("Variedad registrada con éxito.");
      closeModal();
      data();
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error al registrar la variedad. Por favor, revisa la consola para más detalles."
      );
    }
  };

  const handleActualizar = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const baseURL = `http://${IP}:3000/variedades/actualizar/${userData.codigo}`;
      const response = await axios.put(baseURL, formData, {
        headers: { token },
      });
      console.log(formData);
      if (response.status === 201) {
        Alert.alert("Se actualizó con éxito la variedad");
        closeModal();
        data();
      } else {
        Alert.alert("Error al actualizar la variedad");
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
        <Text style={styles.etiqueta}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.nombre}
          onChangeText={(text) => handleInputChange("nombre", text)}
          placeholder="Ingrese el nombre de la variedad"
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
            { label: "Activo", value: 1 },
            { label: "Inactivo", value: 2 },
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

export default VariedadesModel;
