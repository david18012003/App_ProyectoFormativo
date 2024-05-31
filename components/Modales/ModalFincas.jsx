import React from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import MuestraModel from "../Organismos/MuestraModel";
import FincaModel from "../Organismos/FincaModel";

const ModalFincas = ({ visible, onClose, title, data, userData, userId }) => {
  return (
    <Modal
      animationType="slide"
      onDismiss={() => console.log("hola modal")}
      onShow={() => console.log("hola mundo")}
      transparent
      visible={visible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(1,1,1, 0.5)",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "98%",
            width: "90%",
            backgroundColor: "#fff",
            borderRadius: 20,
          }}
        >
          <View
            style={{
              height: 45,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <Text
                style={{
                  textAlign: "center",
                  width: 30,
                  height: 30,
                  color: "#000",
                  fontSize: 30,
                }}
              >
                X
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View
              style={{
                margin: 12,
              }}
            >
              <FincaModel
                closeModal={onClose}
                title={title}
                data={data}
                userData={userData}
                userId={userId}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFincas;
