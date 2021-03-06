/**
 * Created by fanyafang on 2018/1/25.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
}from 'react-native';

import NavigationBar from  '../../common/NavigationBar';
import CheckBox from 'react-native-check-box';
import ViewUtil from '../../util/ViewUtil';
import ArrayUtil from '../../util/ArrayUtil';
import LanguageDao,{FLAGE_LANGUAGE} from '../../expand/dao/LanguageDao';

export default class CustomKeyPage extends Component{
    constructor(props){
        super(props);
        this.isRemoveKey=this.props.isRemoveKey?true:false;
        this.languageDao=new LanguageDao(FLAGE_LANGUAGE.flag_key);
        this.chanageValues=[];
        this.state={
            dataArray:[]
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then((result)=>{
                this.setState({
                    dataArray:result
                })
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    onSave(){
        if(this.chanageValues.length===0){
            this.props.navigator.pop();
            return;
        }
        if(this.isRemoveKey){
            for(let i=0;i<this.chanageValues.length;i++){
                ArrayUtil.remove(this.state.dataArray,this.chanageValues[i]);
            }
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }
    onBack(){
        if(this.chanageValues.length===0){
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {text: 'Cancel', onPress: () => {this.props.navigator.pop();}, style: 'cancel'},
                {text: 'OK', onPress: () => {this.onSave()}},
            ]
        )
    }
    onClick(data){
        if(!this.isRemoveKey){
            data.checked=!data.checked;
        }
        ArrayUtil.updateArray(this.chanageValues,data);
    }
    renderCheckBox(data){
        let leftText = data.name;
        let checked = this.isRemoveKey?false:data.checked;
        return <CheckBox style={{flex:1,padding:10}}
                         onClick={()=>this.onClick(data)}
                         isChecked={checked}
                         leftText={leftText}
                />
    }
    renderView(){
        if(!this.state.dataArray||this.state.dataArray.length===0)return null;
        let len=this.state.dataArray.length;
        let views=[];
        for(let i=0,l=len-2;i<l;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len-2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views;

    }
    render(){
        let title=this.isRemoveKey?'删除标签页':'自定义标签页';
        let rightButtonTitle=this.isRemoveKey?'移除':'保存';

        let rightButton=<TouchableOpacity
            onPress={()=>this.onSave()}>
            <View style={{margin:10}}>
                <Text style={styles.title}>{rightButtonTitle}</Text>
            </View>
        </TouchableOpacity>;

        return <View style={styles.container}>
            <NavigationBar
                title={title}
                style={{backgroundColor:'#2196F3'}}
                leftButton={ViewUtil.getLeftButton(()=>{this.onBack()})}
                rightButton={rightButton}
            />
            <ScrollView>
                {this.renderView()}
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    title:{
        fontSize:20,
        color:'white'
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
});