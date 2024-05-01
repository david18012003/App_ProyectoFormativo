import { Router } from 'express'
import { desactivarAnalisis, actualizarAnalisis, registrarAnalisis, listarAnalisis, buscarAnalisis, activarAnalisis } from '../controllers/analisis.controller.js'
import { validarAnalisis } from '../../validate/analisis.validate.js'
import { validarToken } from '../controllers/seguridad.controller.js'

const routeAnalisis = Router()

// localhost:3333/analisis/1
routeAnalisis.post("/registrar",validarAnalisis, registrarAnalisis)
routeAnalisis.put("/actualizar/:codigo",validarToken, validarAnalisis, actualizarAnalisis)
routeAnalisis.put("/desactivar/:codigo",validarToken, desactivarAnalisis)
routeAnalisis.put("/activar/:codigo",validarToken, activarAnalisis)
routeAnalisis.get('/listar', validarToken, listarAnalisis)
routeAnalisis.get('/buscar/:codigo',validarToken, buscarAnalisis)

export default routeAnalisis