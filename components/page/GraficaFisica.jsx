import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { processColor } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-charts-wrapper';
import HeaderPrincipal from '../Modales/HeaderPrincipal';

const data = [
  
  { value: 25, label: 'Categoría 1', color: '#FFD700' },
  { value: 45, label: 'Categoría 2', color: '#7CFC00' },
  { value: 30, label: 'Categoría 3', color: '#00BFFF' },
];

const GraficaFisica = () => {
  return (
    <>
    <HeaderPrincipal title={"Graficas"}/>
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Analisis Actual</Text>
        <PieChart
          style={{ height: 300, width: 300 }}
          data={{
            dataSets: [{
              values: data,
              label: '',
              config: {
                colors: data.map((item) => processColor(item.color)),
                valueTextSize: 20,
                valueTextColor: processColor('green'),
                sliceSpace: 5,
                selectionShift: 13,
                xValuePosition: 'OUTSIDE_SLICE',
                yValuePosition: 'OUTSIDE_SLICE',
                valueFormatter: "#.#'%'",
                valueLineColor: processColor('green'),
                valueLinePart1Length: 0.5
              }
            }]
          }}
          rotationEnabled={true}
          highlightPerTapEnabled={true}
          drawEntryLabels={false}
          centerText={'Gráfico Circular'}
          centerTextRadiusPercent={100}
          holeRadius={40}
          holeColor={processColor('#f0f0f0')}
          transparentCircleRadius={45}
          transparentCircleColor={processColor('#f0f0f088')}
          maxAngle={360}
          onSelect={(event) => console.log(event.nativeEvent)}
          onChange={(event) => console.log(event.nativeEvent)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Analisis general</Text>
        <LineChart
          data={{
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
            datasets: [
              {
                data: [60, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={Dimensions.get('window').width - 16} 
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} 
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, 
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 5,
          }}
        />
      </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginVertical: 10,
    color: '#000',
  },
});

export default GraficaFisica;



