/**
 * Created by fanyafang on 2018/1/24.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
}from 'react-native';

import HomePage from './HomePage';
import NavigationBar from  '../common/NavigationBar';

export default class WelcomPage extends Component{
    componentDidMount(){
        this.time=setTimeout(()=>{
            this.props.navigator.resetTo({
                component:HomePage
            })
        },2000)
    }
    componentWillUnmount(){
        this.time&&clearTimeout(this.time);
    }
    render(){
        return <View>
            <NavigationBar
                title={'欢迎'}
            />
            <Text>欢迎</Text>
        </View>
    }
}