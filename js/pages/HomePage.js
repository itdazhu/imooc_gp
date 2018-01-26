/**
 * Created by fanyafang on 2018/1/24.
 */
import React,{Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
}from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import MyPage from './my/MyPage'

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_popular'
        }
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
                    <PopularPage/>
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
                    <View style={styles.page1}></View>
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