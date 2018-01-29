/**
 * Created by fanyafang on 2018/1/25.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
}from 'react-native';

import NavigationBar from  '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';

export default class MyPage extends Component{
    render(){
        return <View>
            <NavigationBar
                title={'我的'}
                style={{
                    backgroundColor:'#2196F3'
                }}
            />
            <Text onPress={()=>{
                this.props.navigator.push({
                    component:CustomKeyPage,
                    params:{...this.props}
                })
            }
            }>我的</Text>
            <Text onPress={()=>{
                this.props.navigator.push({
                    component:SortKeyPage,
                    params:{...this.props}
                })
            }
            }>排序</Text>
        </View>
    }
}

