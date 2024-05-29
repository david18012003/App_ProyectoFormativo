import React, {useState} from 'react';
import Share from 'react-native-share';
import {
  Button,
  View,
  Platform,
  Alert,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import logoSennova from '../../assets/logoSennova.png';
import logoPequeno from '../../assets/logoPequeno.png';
import logoOIP from '../../assets/OIP.jpg';

const PDFGenerator = () => {
  const [pdfUri, setPdfUri] = useState(null);

  // Función para generar el PDF
  const createPDF = async () => {
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getDate()}-${
      fechaActual.getMonth() + 1
    }-${fechaActual.getFullYear()}`;
    const htmlContent = `
      
<html>
<head>
<style>
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}
h1, h2, h3 {
  color: #000000;
}
h1 { font-size: 2em; }
h2 { font-size: 1.75em; }
h3 { font-size: 1.5em; }
p { margin-bottom: 1em; }
ul, ol {
  margin-left: 1.5em;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
}
th, td {
  border: 1px solid #000;
  padding: 0px;
  text-align: left;
}
.logo {
  width: auto;
  height: 100px;
  margin: 0 auto;
  display: block;
}
.nueva-pagina {
  page-break-before: always;
}
.tabla1 {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.th1,.td1 {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  width: calc(100% / 3);
  vertical-align: top;
}
</style>
</head>
<body>
  <div>
  <table>
  <tbody>
    <tr>
      <td style=" align-items: center;margin: 0px;">
        <img  src="../../assets/logoPequeno.png" alt="Logo Sena" class="logo">
      </td>
      <td style="text-align: center;">
        Centro de Gestión y Desarrollo Sostenible<br>
        Surcolombiano<br>
        Escuela Nacional de la Calidad del Café
      </td>
      <td style="align-items: center;margin: 0px;">
        <img  src="../../assets/logoSennova.png" alt="Logo Sena" class="logo">
      </td>
    </tr>
    <tr>
      <td>
        <img src="../../assets/OIP.jpg" alt="Logo Sena" class="logo">
      </td>
      <td style="text-align: center;">INFORME SERVICIO ANALISIS FISICO SENSORIAL</td>
      <td style="height: 60px;">
        <div style="font-size: small; margin:0px;">
          <p style="text-align: left; margin: 2px;">CÓDIGO: FS-D-01</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left; margin: 2px;">VERSIÓN: 01</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left;margin: 2px;" class="fecha" id="fecha">FECHA: ${fechaFormateada}</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left;margin: 2px;">PÁGINA: 1 de 4</p>
        </div>
      </td>
    </tr>
  </tbody>
</table>
  
    <h1>1.  Objetivo</h1>
    <p>El objetivo del siguiente informe es presentar los resultados del análisis físico-sensorial obtenidos para
      la muestra de café AFS-40 descrita a continuación.</p>
  
      <h1>
        2. Informacion general
      </h1>
  
      <ul style="list-style-type: disc;">
        <li>Productor: </li>
        <li>Departamento: </li>
        <li>Municipio: </li>
        <li>Vereda: </li>
        <li>Finca: </li>
        <li>Codigo Externo: </li>
        <li>Consecutivo Informe: </li>
      </ul>
  
      <h1>3. Especificaciones del café</h1>
      <table>
        <tbody>
          <tr>
            <td style="text-align: left;">
              Variedad De Café
            </td>
            <td>
              Cenicafé
            </td>
            <td style="text-align: left;">
              Método De Muestreo 
            </td>
            <td>
              No especifica
            </td>
          </tr>
          <tr>
            <td style="text-align: left;">
              Altura Del Cultivo (m.s.n.m)
            </td>
            <td>1530 </td>
            <td style="text-align: left;">
              Método Para La Preparación De La Muestra
            </td>
            <td>
              No especifica
            </td>
          </tr>
        </tbody>
      </table>
      <h1>4. Datos generales del café</h1>
      <table>
        <tbody>
          <tr>
            <td style="text-align: left;">
              Tipo de Molienda
            </td>
            <td>
              Media
            </td>
            <td style="text-align: left;">
              Tipo De Tostión
            </td>
            <td>
              Media
            </td>
          </tr>
          <tr>
            <td style="text-align: left;">
              Tipo De Fermentación
            </td>
            <td>No especificada </td>
            <td style="text-align: left;">
              Tiempo De Fermentación
            </td>
            <td>
              No especifica
            </td>
        </tr>
        <tr>
          <td style="text-align: left;">
            Densidad De Café Verde (g/L) 
          </td>
          <td>No reporta  </td>
          <td style="text-align: left;">
            Actividad De Agua (Aw)
          </td>
          <td>
            No reporta
          </td>
        </tr>
        <tr>
          <td style="text-align: left;">
            Fecha De Procesamiento 
          </td>
          <td>05-07-2023  </td>
          <td style="text-align: left;">
            Tiempo De Secado
          </td>
          <td>
            No especifica
          </td>
        </tr>
        <tr>
          <td style="text-align: left;">
            Código de la Muestra 
          </td>
          <td>AFS-40 </td>
          <td style="text-align: left;">
            Presentación 
          </td>
          <td>
            C.P. S
          </td>
        </tr>
        </tbody>
      </table>
      
  
  </div>
  <div class="nueva-pagina">
  <table>
  <tbody>
    <tr>
      <td style=" align-items: center;margin: 0px;">
        <img  src="../../assets/logoPequeno.png" alt="Logo Sena" class="logo">
      </td>
      <td style="text-align: center;">
        Centro de Gestión y Desarrollo Sostenible<br>
        Surcolombiano<br>
        Escuela Nacional de la Calidad del Café
      </td>
      <td style="align-items: center;margin: 0px;">
        <img  src="../../assets/logoSennova.png" alt="Logo Sena" class="logo">
      </td>
    </tr>
    <tr>
      <td>
        <img src="../../assets/OIP.jpg" alt="Logo Sena" class="logo">
      </td>
      <td style="text-align: center;">INFORME SERVICIO ANALISIS FISICO SENSORIAL</td>
      <td style="height: 60px;">
        <div style="font-size: small; margin:0px;">
          <p style="text-align: left; margin: 2px;">CÓDIGO: FS-D-01</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left; margin: 2px;">VERSIÓN: 01</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left;margin: 2px;" class="fecha" id="fecha">FECHA: ${fechaFormateada}</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left;margin: 2px;">PÁGINA: 2 de 4</p>
        </div>
      </td>
    </tr>
  </tbody>
</table>
    <h1>5. Análisis Físico </h1>
    <table border="1">
      <thead>
        <tr>
          <th colspan="4" style="background-color: #C6E0B4;">ANÁLISIS FÍSICO</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Peso C.P.S (g)</td>
          <td>250</td>
          <td>Humedad (%)</td>
          <td>10.4</td>
        </tr>
        <tr>
          <td>Peso Cisco (g)</td>
          <td>44.5</td>
          <td>Merma por trilla (%)</td>
          <td>17.8</td>
        </tr>
        <tr>
          <td>Peso total de la almendra (g)</td>
          <td>205.5</td>
          <td>Porcentaje de almendra sana (%)</td>
          <td>72.6</td>
        </tr>
        <tr>
          <td>Peso defectos totales (g)</td>
          <td>24</td>
          <td>Factor de rendimiento (Kg C.P.S)</td>
          <td>96.4</td>
        </tr>
        <tr>
          <td>Peso de almendra sana (g)</td>
          <td>181.5</td>
          <td>Porcentaje de defectos totales (%)</td>
          <td>9.6</td>
        </tr>
        <tr>
          <td>Negro total o parcial (g)</td>
          <td>0</td>
          <td>Cardenillo (g)</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Vinagre (g)</td>
          <td>1</td>
          <td>Cristalizado (g)</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Veteado (g)</td>
          <td>0</td>
          <td>Ámbar o mantequillo (g)</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Sobresecado (g)</td>
          <td>0</td>
          <td>Mordido o cortado (g)</td>
          <td>0.5</td>
        </tr>
        <tr>
          <td>Picado por insectos (g)</td>
          <td>1</td>
          <td>Averanado o arrugado (g)</td>
          <td>11</td>
        </tr>
        <tr>
          <td>Inmaduro o paloteado(g)</td>
          <td>10</td>
          <td>Aplastado (g)</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Flojo (g)</td>
          <td>0</td>
          <td>Decolorado o reposado (g)</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Malla 18 (g)</td>
          <td>127.7</td>
          <td>Malla 15 (g)</td>
          <td>7</td>
        </tr>
        <tr>
          <td>Malla 17 (g)</td>
          <td>44.6</td>
          <td>Malla 14 (g)</td>
          <td>3</td>
        </tr>
        <tr>
          <td>Malla 16 (g)</td>
          <td>21.6</td>
          <td>Mallas menores (g)</td>
          <td>0.5</td>
        </tr>
      </tbody>
    </table>
    
  </div>
  <div class="nueva-pagina">
  <table>
  <tbody>
    <tr>
      <td style=" align-items: center;margin: 0px;">
        <img  src="../../assets/logoPequeno.png" alt="Logo Sena" class="logo">
      </td>
      <td style="text-align: center;">
        Centro de Gestión y Desarrollo Sostenible<br>
        Surcolombiano<br>
        Escuela Nacional de la Calidad del Café
      </td>
      <td style="align-items: center;margin: 0px;">
        <img  src="../../assets/logoSennova.png" alt="Logo Sena" class="logo">
      </td>
    </tr>
    <tr>
      <td>
        <img src="../../assets/OIP.jpg" alt="Logo Sena" class="logo">
      </td>
      <td style="text-align: center;">INFORME SERVICIO ANALISIS FISICO SENSORIAL</td>
      <td style="height: 60px;">
        <div style="font-size: small; margin:0px;">
          <p style="text-align: left; margin: 2px;">CÓDIGO: FS-D-01</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left; margin: 2px;">VERSIÓN: 01</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left;margin: 2px;" class="fecha" id="fecha">FECHA: ${fechaFormateada}</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left;margin: 2px;">PÁGINA: 3 de 4</p>
        </div>
      </td>
    </tr>
  </tbody>
</table>
    <table border="1">
      <td colspan="3" style="text-align: center; background-color: #C6E0B4;">DATOS GENERALES DE LA MUESTRA
          </td>
      <tr>
        
        <td >
          <!-- Tabla exterior -->
          <table class="tabla1" border="1">
            <tr>
              <th class="th1">ATRIBUTO</th>
              <th class="th1">PUNTAJE</th>
              <th class="th1">DESCRIPCION <br> SENSORIAL</th>
            </tr>
            <tr>
              <td class="td1">Fragancia aroma:</td>
              <td class="td1">8.00</td>
              <td class="td1" rowspan="11">Notas: Chocolate, Floral, cuerpo maduro, Sabor residual agradable.</td>
            </tr>
            <tr>
              <td class="td1">Sabor:</td>
              <td class="td1">7.75</td>
            </tr>
            <tr>
              <td class="td1">Retrogusto:</td>
              <td class="td1">7.75</td>
            </tr>
            <tr>
              <td class="td1">Acidez:</td>
              <td class="td1">7.75</td>
            </tr>
            <tr>
              <td class="td1">Cuerpo:</td>
              <td class="td1">7.75</td>
            </tr>
            <tr>
              <td class="td1">Uniformidad:</td>
              <td class="td1">10.00</td>
            </tr>
            <tr>
              <td class="td1">Balance:</td>
              <td class="td1">7.75</td>
            </tr>
            <tr>
              <td class="td1">Taza limpia:</td>
              <td class="td1">10.00</td>
            </tr>
            <tr>
              <td class="td1">Dolzor:</td>
              <td class="td1">7.75</td>
            </tr>
            <tr>
              <td class="td1">Puntaje general:</td>
              <td class="td1">7.75</td>
            </tr>
            <tr>
              <td class="td1">Puntaje total:</td>
              <td class="td1" id="totalCell">82.25</td>
            </tr>
          </table>
          
          <table id="tabla1" border="1">
            <td colspan="3" style="text-align: center; background-color: #C6E0B4;">DATOS 
            </td>
            
            <tr>
              <td>GRafica</td>
            </tr>
           
              
          </table>
        </td>
        
      </tr>
    </table>
    
  </div>
  <div class="nueva-pagina">
  <table>
  <tbody>
    <tr>
      <td style=" align-items: center;margin: 0px;">
        <img  src="../../assets/logoPequeno.png" alt="Logo Sena" class="logo">
      </td>
      <td style="text-align: center;">
        Centro de Gestión y Desarrollo Sostenible<br>
        Surcolombiano<br>
        Escuela Nacional de la Calidad del Café
      </td>
      <td style="align-items: center;margin: 0px;">
        <img  src="../../assets/logoSennova.png" alt="Logo Sena" class="logo">
      </td>
    </tr>
    <tr>
      <td>
        <img src="../../assets/OIP.jpg" alt="Logo Sena" class="logo">
      </td>
      <td style="text-align: center;">INFORME SERVICIO ANALISIS FISICO SENSORIAL</td>
      <td style="height: 60px;">
        <div style="font-size: small; margin:0px;">
          <p style="text-align: left; margin: 2px;">CÓDIGO: FS-D-01</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left; margin: 2px;">VERSIÓN: 01</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left;margin: 2px;" class="fecha" id="fecha">FECHA: ${fechaFormateada}</p>
          <div style="border: none; border-top: 1px solid #000; width: 100%; margin: 0;"></div> <!-- Línea de división personalizada -->
          <p style="text-align: left;margin: 2px;">PÁGINA: 4 de 4</p>
        </div>
      </td>
    </tr>
  </tbody>
</table>
    <h1>7. Conclusión y recomendaciones</h1>

  <p style="margin-bottom: 400px;">Se recomienda hacer un análisis de suelo, para que pueda hacer una regulación de pH y así realizar una
    correcta fertilización del café, además se recomienda hacer una buena recolección seleccionando solo
    frutos maduros evitando granos inmaduros y sobre maduros.
    </p>

    <table>
      <tbody>
        <tr>
          <td rowspan="4"><h2 style="margin-top: 200px;">Álvaro Murcia
            Instructor Análisis Sensorial - ENCC
            Pitalito</h2></td>
          <td rowspan="4"><h2 style="margin-top: 200px;">Silvia Andrea Forero Artunduaga
            Instructor Análisis Sensorial - ENCC
            Pitalito</h2></td>
          <td rowspan="4"><h2 style="margin-top: 200px;">Julio Mario Artunduaga
            Responsable Gestión Técnica - ENCC
            Pitalito</h2></td>
        </tr>
        
      </tbody>
    </table>
    

  </div>
  
</body>
<script>
  var fechaActual = new Date();
  var dia = fechaActual.getDate();
  var mes = fechaActual.getMonth() + 1;
  var ano = fechaActual.getFullYear();
  var fechaFormateada = dia + '-' + mes + '-' + ano;

  var elementoFecha = document.querySelector('.fecha');
  elementoFecha.textContent = 'FECHA: ' + fechaFormateada;


</script>
</html>

    `;

    const options = {
      html: htmlContent,
      fileName: 'Certificado_MADAC',
      directory: Platform.OS === 'android' ? 'Descargas' : 'Documentos',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      if (!file.filePath) {
        throw new Error('No se pudo generar el PDF');
      }
      setPdfUri(file.filePath);
      Alert.alert('Éxito', 'PDF generado con éxito!');
      return file.filePath; // Devolver el path del PDF generado
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al generar el PDF.');
    }
  };

  // Función para compartir el PDF
  const sharePDF = async pdfPath => {
    if (!pdfPath) {
      Alert.alert('Error', 'No hay PDF generado para compartir.');
      return;
    }

    const options = {
      title: 'Compartir PDF',
      url: `file://${pdfPath}`,
      type: 'application/pdf',
    };

    try {
      const shareResponse = await Share.open(options);
      console.log(shareResponse);
    } catch (error) {
      console.error('Error al compartir el PDF:', error);
    }
  };

  const generarPDF = async () => {
    try {
      const pdfPath = await createPDF(); // Generar el PDF y obtener el path
      await sharePDF(pdfPath); // Compartir el PDF utilizando el path obtenido
    } catch (error) {
      console.error('Error al generar o compartir el PDF:', error);
    }
  };

  return (
    <>
      <View>
      
        <TouchableOpacity onPress={generarPDF}><Image source={require('../../assets/archivo.png')}/></TouchableOpacity>
      </View>
    </>
  );
};

export default PDFGenerator;
