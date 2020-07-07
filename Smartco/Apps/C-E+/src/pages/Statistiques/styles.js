/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';
import { chart } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9'
  },
  chartContainer: {
    ...chart.chartContainer,
    // marginTop: 80,
    marginTop: 15,
    marginBottom: 10
  },
  facilitieContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '96%',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070f12',
    margin: 20
  }
});

export default styles;
