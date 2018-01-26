/**
 * Created by fanyafang on 2018/1/25.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
}from 'react-native';

export default class ViewUtil{
    static  getLeftButton(callBack){
        return <TouchableOpacity
            style={{padding:8}}
            onPress={callBack}>
            <Image
                style={{width:22,height:22,margin:10}}
                source={require('../../res/images/back_icon.png')}
            ></Image>
        </TouchableOpacity>
    }
}