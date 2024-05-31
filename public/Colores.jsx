export const colorsDia = {};

export const colorsNoche = {
  backgroundColor: '',
  color: '#eaede6',
};
export const colores = {
  azul: '#273468',
  blanco: '#eaede6',
};
import {StyleSheet} from 'react-native';

export const sharedStyles = StyleSheet.create({
  dia: {
    color: colores.azul,
  },
  noche: {
    color: colores.blanco,
  },
  active: {
    color: 'green',
  },
  inactive: {
    color: 'red',
  },
  conteinerDia: {
    backgroundColor: colores.blanco,
  },
  conteinerNoche: {
    backgroundColor: colores.azul,
  },

  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    padding: 10,
  },

  userContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    color: '#eaede6',
  },
  buttonContainerD: {
    alignContent: 'flex-end',
    margin: 10,
  },
  key: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#eaedf6',
  },
  value: {},
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    // marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
    color: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#9c9c9c',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#000',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 8,
    height: 47,
    borderColor: '#9c9c9c',
  },
  pickerContainer1: {
    flex: 1/2,
    borderRadius: 8,
    height: 47,
    borderColor: '#9c9c9c',
  },
  button: {
    backgroundColor: '#0083FF',
    color: '#000',
    padding: 10,
    borderRadius: 5,
  },
  actualizar: {
    color: '#fff',
  },
  contenedorBtn: {
    flexDirection: 'row',
  },
  buttonD: {
    backgroundColor: '#FF3200',
    // color: "#999",
    padding: 10,
    borderRadius: 5,
  },
  buttonDa: {
    backgroundColor: '#039B1E',
    // color: "#999",
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#336699',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImage: {
    width: 50,
    height: 50,
  },
});
