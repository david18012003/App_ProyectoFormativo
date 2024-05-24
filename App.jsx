import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import StackNav from './components/Templates/Stack'
import ListarUsuarios from './components/page/ListarUsuarios'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import VistaPrincipal from './components/page/VistaPrincipal';
import ModalInternet from './components/Modales/ModalInternet';
import PDFCreator from './components/generadorPDF/PDFCreator';
import ModalSlidebar from './components/Modales/ModalSlidebar';
import Analisis from './components/page/Analisis';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
   <>
       <NavigationContainer>
          {/* <Drawer.Navigator>
            <Drawer.Screen name='Vista' component={VistaPrincipal}/>
            <Drawer.Screen name='Usuarios' component={ListarUsuarios}/>
          </Drawer.Navigator> */}
          <StackNav/>
          {/* <Analisis/> */}
          {/* <ModalSlidebar/> */}
       </NavigationContainer>
   </>
  )
}

export default App