import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListarUsuarios from '../page/ListarUsuarios';
import VistaPrincipal from '../page/VistaPrincipal';
import GraficaFisica from '../page/GraficaFisica';
import GraficaSensorial from '../page/GraficaSensorial';
import Informacion from '../page/Informacion';

const Tab = createBottomTabNavigator();

const BotonesTabs = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen 
          name="Inicio" 
          component={VistaPrincipal} 
          options={{ 
           headerShown:false,
           tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          )
          }}
        />
        <Tab.Screen 
          name="Fisico" 
          component={GraficaFisica} 
          options={{ 
           headerShown:false,
           tabBarIcon:({ color, size})=>(
              <Image source={require('../../assets/grafica.png')}
              style={{width:size, height:size, tintColor:color}}
              />
           )
          }}
        />
        <Tab.Screen 
          name="Sensorial" 
          component={GraficaSensorial} 
          options={{ 
           headerShown:false,
           tabBarIcon:({color,size})=>(
            <Image source={require('../../assets/diagrama.png')}
            style ={{width:size, height:size, tintColor:color}}
            />
           )
          }}
        />
        <Tab.Screen 
          name="analisisFisico" 
          component={Informacion} 
          options={{ 
            headerShown:false,
            tabBarIcon:({color, size})=>(
              <Image source={require('../../assets/informacion.png')}
              style={{ width:size, height:size, tintColor:color }}
              />
            )
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default BotonesTabs;
