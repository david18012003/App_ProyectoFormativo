import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import VariableModel from "../Organismos/VariableModel";

const ModalVariables = ({ visible, onClose, title, data, userData, userId }) => {
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "45%",
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
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  margin: 10,
                }}
                source={require('../../assets/cerrar.png')}
              />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                margin: 12,
              }}
            >
              <VariableModel
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

export default ModalVariables;
