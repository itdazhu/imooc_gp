/**
 * Created by fanyafang on 2018/1/18.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ListView,
    RefreshControl,
}from 'react-native';

import NavigationBar from  '../js/common/NavigationBar';
import Toast,{DURATION} from 'react-native-easy-toast';

var data={
    result:[
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        },
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        },
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        },
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        },
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        },
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        },
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        },
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        },
        {
            "email":"s.hfdhshfslahfdncbcb@william.net",
            "fullName":"赫迪拉和放大拉横幅"
        },
        {
            "email":"s.dsafdwerrefd@william.net",
            "fullName":"都睡啦回复"
        }
    ]
}

export default class ListViewTest extends Component {
    constructor(props){
        super(props);
        const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
            isLoading:true,
        }
        this.onLoad();
    }
    renderRow(item){
        return <View>
            <TouchableOpacity
                onPress={()=>{
                    this.toast.show('你单击了：'+item.fullName,DURATION.LENGTH_LONG)
                }}>
                <Text style={styles.row}>{item.fullName}</Text>
                <Text style={styles.row}>{item.email}</Text>
            </TouchableOpacity>
        </View>
    }
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={styles.line}></View>
    }
    renderFooter(){
        return <Image  style={{width:500,height:50}}
                       source={{uri:'http://img.zcool.cn/community/01c53f5567f0930000016756edc878.jpg@900w_1l_2o_100sh.jpg'}}/>
    }
    onLoad(){
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        },2000)
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar title={'ListViewTest'}
                               style={{backgroundColor:'#FF3E96'}}>

                </NavigationBar>
                <ListView dataSource={this.state.dataSource}
                         renderRow={(item)=>this.renderRow(item)}
                          renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator()}
                          renderFooter={()=>this.renderFooter()}
                          refreshControl={
                              <RefreshControl
                              refreshing={this.state.isLoading}
                              onRefresh={()=>this.onLoad()}
                          />}
                />
                <Toast ref={toast=>{this.toast=toast}}/>
            </View>
    )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    text:{
        fontSize:20
    },
    row:{
        height:50
    },
    line:{
        height:1,
        backgroundColor:'black'
    }
})