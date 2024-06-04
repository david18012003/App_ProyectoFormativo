import 'react-native-gesture-handler';
import React from 'react'
import StackNav from './components/Templates/Stack'
import { NavigationContainer } from '@react-navigation/native';
import BotonesTabs from './components/Templates/BotonesTabs';



const App = () => {
  return (
   <>
       <NavigationContainer>
        <StackNav/>
        {/* <BotonesTabs/> */}
          
       </NavigationContainer>
   </>
  )
}

export default App




















{/* <Drawer.Navigator>
            <Drawer.Screen name='Vista' component={VistaPrincipal}/>
            <Drawer.Screen name='Usuarios' component={ListarUsuarios}/>
          </Drawer.Navigator> */}
          // <StackNav/>
          {/* <BotonesTabs/> */}
          {/* <Analisis/> */}
          {/* <Muestras/> */}
          {/* <ListarFincas/> */}
          {/* <ModalSlidebar/> */}
          {/* <ListarVariedades/> */}
          {/* <ListarLotes/> */}