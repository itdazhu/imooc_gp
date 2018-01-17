/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      selectedTab:'tb_popular'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_popular'}
              selectedTitleStyle = {{color:'red'}}
              title="最热"
              renderIcon={() => <Image style={styles.image} source={require('./res/images/tab_home_icon_normal.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/tab_home_icon_selected.png')} />}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            <View style={styles.page1}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_trending'}
              selectedTitleStyle = {{color:'red'}}
              title="趋势"
              renderIcon={() => <Image style={styles.image} source={require('./res/images/tab_message_icon_normal.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/tab_message_icon_selected.png')} />}
              onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_favorite'}
              selectedTitleStyle = {{color:'red'}}
              title="收藏"
              renderIcon={() => <Image style={styles.image} source={require('./res/images/tab_message_icon_normal.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/tab_message_icon_selected.png')} />}
              onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <View style={styles.page1}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_my'}
              selectedTitleStyle = {{color:'red'}}
              title="我的"
              renderIcon={() => <Image style={styles.image} source={require('./res/images/tab_message_icon_normal.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/tab_message_icon_selected.png')} />}
              onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  page1:{
    flex:1,
    backgroundColor:'red',
  },
  page2:{
    flex:1,
    backgroundColor:'yellow',
  },
  image:{
    height:22,
    width:22,
  }
});
