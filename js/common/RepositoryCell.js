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
    constructor(props){
        super(props);
        this.state={
            isFarivate:this.props.projectModel.isFarivate,
            farivateIcon:this.props.projectModel.isFarivate?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        }
    }
    updateFarivate(isFarivate){
        this.setState({
            isFarivate:isFarivate,
            farivateIcon:isFarivate?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        })
        this.props.onFarivate(this.props.projectModel.item,isFarivate);
    }
    //属性改变的时候调用
    componentWillReceiveProps(nextProps){
        this.updateFarivate(nextProps.projectModel.isFarivate);
    }
    render(){
        let item=this.props.projectModel.item;
        let farivateButton=<TouchableOpacity
            onPress={()=>{
                this.updateFarivate(!this.state.isFarivate);
            }}>
            <Image
                style={{width:22,height:22,tintColor:'#2196F3'}}
                source={this.state.farivateIcon}/>
        </TouchableOpacity>;
        return <TouchableOpacity
            style={styles.container}
            onPress={this.props.onSelect}
        >
            <View style={styles.cell_container}>
            <Text style={styles.title}>{item.full_name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Author:</Text>
                    <Image
                        style={{width:22,height:22}}
                        source={{uri:item.owner.avatar_url}}/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Stars:</Text>
                    <Text>{item.stargazers_count}</Text>
                </View>
                {farivateButton}
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