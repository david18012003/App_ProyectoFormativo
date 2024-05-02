import { View, Text } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import ListarUsuarios from '../page/ListarUsuarios';
import Login from '../page/Login';
import VistaPrincipal from '../page/VistaPrincipal';
import PerfilUsuario from '../page/PerfilUsuario';

const Stack = createNativeStackNavigator()

const StackNav = () => {
  return (

      <Stack.Navigator>
        <Stack.Screen name='Login'  component={Login} options={{
          headerTitleStyle: {
            fontWeight: 'bold', // Establece el peso de la fuente
            fontSize: 18, // Tamaño de la fuente
            color: '#fff', // Color del texto
          },
          headerStyle: {
            backgroundColor: '#336699', // Color de fondo del encabezado
          },
          headerTintColor: '#fff', // Color del texto del encabezado
        }}/>
        <Stack.Screen name='vista1'  component={VistaPrincipal} options={{headerShown:false}}/>
        <Stack.Screen name='Listar' component={ListarUsuarios} options={{headerShown:false}}/>
        <Stack.Screen name='Perfil' component={PerfilUsuario}   options={{
          headerTitleStyle: {
            fontWeight: 'bold', // Establece el peso de la fuente
            fontSize: 18, // Tamaño de la fuente
            color: '#fff', // Color del texto
          },
          headerStyle: {
            backgroundColor: '#336699', // Color de fondo del encabezado
          },
          headerTintColor: '#fff', // Color del texto del encabezado
        }}/>
      </Stack.Navigator>
  )
}

export default StackNav