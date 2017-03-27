/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const array = [];
for(var i = 0; i < 10000; i++) {
  array.push({key: i});
}
var {height, width} = Dimensions.get('window');

export default class rnPerformantListTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichList: null,
    }
  }
  reset() {
    this.setState({
      whichList: null,
    });
  }

  scrollDeep() {
    if (this.refs.list) {
      this.refs.list.scrollTo({
        y: 10000 * 30, // Scroll deep in
        animated: false,
      })
    }
    else {
      this.refs.flat.scrollToEnd()
    }
  }

  render() {
    if (this.state.whichList === null) {
      return (
        <View style={styles.container}>
          <Text>What list?</Text>
          <TouchableOpacity onPress={() => this.setState({whichList: 'FlatList'})}>
            <Text style={styles.button}>FlatList</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({whichList: 'ListView'})}>
            <Text style={styles.button}>ListView</Text>
          </TouchableOpacity>
        </View>
      );      
    }


    const buttons = (
      <View>
        <TouchableOpacity onPress={() => this.reset()}>
          <Text style={styles.button}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.scrollDeep()}>
          <Text style={styles.button}>ScrollDeep</Text>
        </TouchableOpacity>      
      </View>
    );

    if (this.state.whichList === 'ListView') {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      const dataSource = ds.cloneWithRows(array);
      return (
        <View style={styles.container}>      
          {buttons}
          <ListView
            ref='list'          
            initialListSize={array.length}
            styles={{width, height}}        
            dataSource={dataSource}
            renderRow={(item) => <Text style={styles.row}>{item.key}</Text>}
          />      
        </View>
      );
    }


    return (
      <View style={styles.container}>
        {buttons}      
        <FlatList
          ref='flat'        
          styles={{width, height}}
          data={array}
          renderItem={({item}) => <Text style={styles.row}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    width,
    height: 30,
  },
  button: {
    width: 300,
    height: 50,
    margin: 20,
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
    backgroundColor: 'blue',
  },  
});

