/**
 * Created by fanyafang on 2018/1/24.
 */
import React,{Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
}from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import MyPage from './my/MyPage'
import WebViewTest from '../../other/WebViewTest'
import Toast,{DURATION} from 'react-native-easy-toast'

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_popular'
        }
    }
    componentDidMount(){
        this.listener=DeviceEventEmitter.addListener('showToast',(text)=>{
            this.toast.show(text,DURATION.LENGTH_LONG);
        })
    }
    componentWillUnmount(){
        this.listener&&this.listener.remove();
    }
    render(){
        return (
            <View style={styles.container}>
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_popular'}
                    selectedTitleStyle = {{color:'#2196F3'}}
                    title="最热"
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/tab_home_icon_normal.png')} />}
                    renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res//images/tab_home_icon_selected.png')} />}
                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                    <PopularPage {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_trending'}
                    selectedTitleStyle = {{color:'#2196F3'}}
                    title="趋势"
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/tab_message_icon_normal.png')} />}
                    renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res//images/tab_message_icon_selected.png')} />}
                    onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                    <View style={styles.page2}>
                    </View>
                </TabNavigator.Item>
                <TabNavigator.Item
                             selected={this.state.selectedTab === 'tb_favorite'}
                             selectedTitleStyle = {{color:'#2196F3'}}
                             title="收藏"
                             renderIcon={() => <Image style={styles.image} source={require('../../res/images/tab_message_icon_normal.png')} />}
                             renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res//images/tab_message_icon_selected.png')} />}
                             onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                    <WebViewTest/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_my'}
                    selectedTitleStyle = {{color:'#2196F3'}}
                    title="我的"
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/tab_message_icon_normal.png')} />}
                    renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/tab_message_icon_selected.png')} />}
                    onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                    <MyPage {...this.props}/>
                </TabNavigator.Item>
            </TabNavigator>
            <Toast ref={toast=>this.toast=toast}/>
        </View>
        )
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