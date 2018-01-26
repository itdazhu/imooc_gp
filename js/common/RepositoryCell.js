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
    TouchableOpacity
}from 'react-native';

export default class RepositoryCell extends Component{
    render(){
        return <TouchableOpacity
            style={styles.container}
        >
            <View style={styles.cell_container}>
            <Text style={styles.title}>{this.props.data.full_name}</Text>
            <Text style={styles.description}>{this.props.data.description}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Author:</Text>
                    <Image
                        style={{width:22,height:22}}
                        source={{uri:this.props.data.owner.avatar_url}}/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Stars:</Text>
                    <Text>{this.props.data.stargazers_count}</Text>
                </View>
                <Image
                    style={{width:22,height:22}}
                    source={require('../../res/images/collect.png')}/>
            </View>
            </View>
            </TouchableOpacity>
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575'
    },
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor:'gray',//iOS阴影
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2,//android的阴影
    }
})