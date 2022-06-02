import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Picker } from 'react-native-web';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#07121B',
      alignItems: 'center', 
      justifyContent: 'center',
    },
    button:{
        borderWidth: 10,
        borderColor: "#89AAFF",
        width: screen.width / 2,
        height: screen.width / 2,
        borderRadius: screen.width / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText:{
        fontSize: 45,
        color: "#89AAFF"
    },
    buttonStop: {
      borderColor: "#FF851B",
    },
    buttonTextStop:{
      color: "#FF851B",
    },
    timerText:{
        color: "#fff",
        fontSize: 90,
    },
    picker:{
      width: 50,
      ...Platform.select({
        android:{
          color: "#fff",
          backgroundColor: "#07121B",
          marginLeft: 10,
        }
      })
    },
    pickerItem:{
      color: "#fff",
      fontSize: 20,
    },
    pickerContainer:{
      flexDirection: "row",
      alignItems: "center",
    },
  });

  const formatNumber = number => '0${number}'.slice(-2);

  const getRemaining = time => {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return { minutes:formatNumber(minutes), seconds: formatNumber(seconds) };
  };

  const createArray = length => {
    const arr = [];
    let i = 0;
    while (i < length) {
      arr.push(i.toString());
      i += 1
    }
    return arr;
  }

  const AVAILABLE_MINUTES = createArray(10);
  const AVAILABLE_SECONDS = createArray(60);

export default function App() {
  setState = {
    remainingSeconds: 90,
    isRunning: false,
    selectedMinutes: "0",
    selectedSeconds: "5",
  };

  this.interval = null;

  componentDidUpdate(prevProp, prevState) {
    if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
      this.stop();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  start = () => {
    this.setState(state => ({
      remainingSeconds: parseInt(state.selectedMinutes, 10) * 60 + parseInt(state.selectedSeconds),
      isRunning: true,
    }));

    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds -1
      }));
    }, 1000)
  };

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({ remainingSeconds: 5,
    isRunning: false,
    });
  }

  renderPicker = () => {
    return (
      <View style={styles.pickerContainer} >
        <Picker 
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.selectedMinutes}
          onValueChange={itemValue => {
            this.setState({ selectedMinutes: itemValue });
          }}
          mode="dropdown"
        >
          {AVAILABLE_MINUTES.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))
          }
        </Picker>
        <Text style={styles.pickerItem}>minutes</Text>
        <Picker 
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.selectedSeconds}
          onValueChange={itemValue => {
            this.setState({ selectedSeconds: itemValue });
          }}
          mode="dropdown"
        >
          {AVAILABLE_SECONDS.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))
          }
        </Picker>
        <Text style={styles.pickerItem}>seconds</Text>
      </View>
    );
  }

  const { minutes, seconds } = getRemaining(this.setState.remainingSeconds);
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      {this.state.isRunning ? (
        <Text style={styles.timerText}>{'${minutes}:${seconds}'}</Text>
      ): this.renderPicker()}
      {this.state.isRunning ? (
        <TouchableOpacity style={[styles.button, styles.buttonTextStop]} onPress={this.stop} >
        <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
      </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={this.start} >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      )}


    </View>
  );
}