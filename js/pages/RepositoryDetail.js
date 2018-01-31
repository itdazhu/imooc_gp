/**
 * Created by fanyafang on 2018/1/18.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    WebView,
    TextInput,
    DeviceEventEmitter
}from 'react-native';

import Girl from './Girl';
import NavigationBar from  '../js/common/NavigationBar';

const URL='http://www.baidu.com';
export default class WebViewTest extends Component {
    constructor(props){
        super(props);
        this.state = {
            url:URL,
            title:'',
            canGoBack:false
        }
    }
    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else{
            DeviceEventEmitter.emit('showToast','到底了');
        }
    }
    go(){
        this.setState({
            url:this.text
        })
    }
    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack,
            title:e.title
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar title={'webViewTest'}
                               style={{
                                   backgroundColor:'#2196F3'
                               }}
                ></NavigationBar>
                <View style={styles.row}>
                    <Text style={styles.title} onPress={()=>{
                        this.goBack();
                    }}>返回</Text>
                    <TextInput style={styles.input}
                               defaultValue={this.state.url}
                               onChangeText={text=>this.text=text}/>
                    <Text style={styles.title}  onPress={()=>{
                        this.go();
                    }}>前往</Text>
                </View>
                <WebView
                    ref={webView=>this.webView=webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}/>
        </View>
    )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    text:{
        fontSize:10
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        margin:10
    },
    input:{
        height:40,
        flex:1,
        borderWidth:1,
        margin:2
    }
})