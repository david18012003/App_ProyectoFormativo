import React from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, Image } from "react-native";
import AnalisisModel from "../Organismos/AnalisisModel.jsx";

const ModalAnalisis = ({ visible, onClose, title, data, userData, userId }) => {
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
              <Image source={require('../../assets/cerrar.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View
              style={{
                margin: 12,
              }}
            >
              <AnalisisModel
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

export default ModalAnalisis;
