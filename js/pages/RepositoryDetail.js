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
    DeviceEventEmitter,
    TouchableOpacity
}from 'react-native';

import NavigationBar from  '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';

const URL='http://www.baidu.com';
export default class RepositoryDetail extends Component {
    constructor(props){
        super(props);
        this.url=this.props.item.html_url;
        let title=this.props.item.full_name;
        this.state = {
            url:this.url,
            title:title,
            canGoBack:false
        }
    }
    onBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else{
            this.props.navigator.pop();
        }
    }
    go(){
        this.setState({
            url:this.text
        })
    }
    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack
        })
    }
    render(){
        let rightButton=<TouchableOpacity
            onPress={()=>this.onSave()}>
            <View style={{margin:10}}>
                <Text style={styles.title}>分享</Text>
            </View>
        </TouchableOpacity>;
        return (
            <View style={styles.container}>
                <NavigationBar title={this.state.title}
                               style={{
                                   backgroundColor:'#2196F3'
                               }}
                               leftButton={ViewUtil.getLeftButton(()=>{this.onBack()})}
                ></NavigationBar>
                <WebView
                    ref={webView=>this.webView=webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    startInLoadingState={true}/>
        </View>
    )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    title:{
        fontSize:20,
        color:'white'
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