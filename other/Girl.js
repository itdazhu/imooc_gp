/**
 * Created by fanyafang on 2018/1/18.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
}from 'react-native';

import NavigationBar from  '../js/common/NavigationBar';

export default class Girl extends Component {
    constructor(props){
        super(props);
        this.state = {
            word:''
        }
    }
    renderButton(image){
        return <TouchableOpacity onPress={()=>{
            this.props.navigator.pop()
            }}>
            <Image style={{width:22,height:22,margin:10}} source={image}></Image>
        </TouchableOpacity>
    }
    render(){
        return (
            <View style={styles.container}>
                /*
                <NavigationBar title={'Girl'}
                               style={{
                                   backgroundColor:'#9932CC'
                               }}
                               leftButton={
                                   this.renderButton(require('./../res/images/back_icon.png'))
                               }
                               rightButton={
                                   this.renderButton(require('./../res/images/collect.png'))
                               }
                ></NavigationBar>
                */
                 <Text style={styles.text}>I am a girl</Text>
                <Text style={styles.text}>我收到了：{this.props.word}</Text>
                <Text style={styles.text}
                    onPress = {()=>{
                        this.props.onCallBack('一盒巧克力')
                        this.props.navigator.pop()
                        }}
                >回赠巧克力</Text>
        </View>
    )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray'
    },
    text:{
        fontSize:20
    }
})