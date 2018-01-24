/**
 * Created by fanyafang on 2018/1/24.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
}from 'react-native';

import WelcomPage from './WelcomPage';
import {Navigator} from 'react-native-deprecated-custom-components';

function setup(){
    //初始化设置
    class Root extends Component{
        render(){
            return <Navigator
                initialRoute = {{
                    component:WelcomPage
                }}
                renderScene = {(route,navigator)=>{
                    let Component = route.component;
                    return <Component navigator={navigator} {...route.params}/>
                }}
            ></Navigator>
        }
    }
    return <Root/>
}

module.exports=setup;
