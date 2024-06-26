import { View, Text } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import ListarUsuarios from '../page/ListarUsuarios';
import Login from '../page/Login';
import VistaPrincipal from '../page/VistaPrincipal';
import PerfilUsuario from '../page/PerfilUsuario';
import Analisis from '../page/Analisis';
import ListarVariables from '../page/variables';
import Muestras from '../page/muestras';
import BotonesTabs from './BotonesTabs';
import ListarFincas from '../page/ListarFincas';
import ListarLotes from '../page/ListarLotes';
import ListarVariedades from '../page/ListarVariedades';

const Stack = createNativeStackNavigator()

const StackNav = () => {
  return (

      <Stack.Navigator>
        <Stack.Screen name='Login'  component={Login} options={{
          headerShown:false
        }}/>
        <Stack.Screen name='vista1'  component={BotonesTabs} options={{headerShown:false}}/>
        <Stack.Screen name='ListarUsuarios' component={ListarUsuarios} options={{headerShown:false}}/>
        <Stack.Screen name='ListarAnalisis' component={Analisis} options={{headerShown:false}}/>
        <Stack.Screen name='ListarVariables' component={ListarVariables} options={{headerShown:false}}/>
        <Stack.Screen name='ListarMuestras' component={Muestras} options={{headerShown:false}}/>
        <Stack.Screen name='ListarFincas' component={ListarFincas} options={{headerShown:false}}/>
        <Stack.Screen name='ListarLotes' component={ListarLotes} options={{headerShown:false}}/>
        <Stack.Screen name='ListarVariedades' component={ListarVariedades} options={{headerShown:false}}/>



        <Stack.Screen name='Perfil' component={PerfilUsuario}   options={{
          headerTitleStyle: {
            fontWeight: 'bold', 
            fontSize: 18, 
            color: '#fff', 
          },
          headerStyle: {
            backgroundColor: '#336699', 
          },
          headerTintColor: '#fff', 
        }}/>
      </Stack.Navigator>
  )
}

export default StackNav