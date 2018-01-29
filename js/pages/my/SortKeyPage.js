/**
 * Created by fanyafang on 2018/1/25.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Alert
}from 'react-native';

import NavigationBar from  '../../common/NavigationBar';
import LanguageDao,{FLAGE_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtil from '../../util/ArrayUtil';
import SortableListView from 'react-native-sortable-listview';
import ViewUtil from '../../util/ViewUtil';

export default class SortKeyPage extends Component{
    constructor(props){
        super(props);
        this.languageDao=new LanguageDao(FLAGE_LANGUAGE.flag_key);
        this.dataArray=[];//原始全部数组
        this.sortResultArray=[];//排序后的全部数组
        this.orignalCheckedArray=[];//原始的选中数组
        this.state={
            checkedArray:[]//排序后的选中数组
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then((result)=>{
                this.getCheckedItem(result);
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    getCheckedItem(result){
        this.dataArray=result;
        let checkedArray=[];
        for(let i=0,len=result.length;i<len;i++){
            let data=result[i];
            if(data.checked)checkedArray.push(data);
        }
        this.setState({
            checkedArray:checkedArray
        })
        this.orignalCheckedArray=ArrayUtil.clone(checkedArray);
    }
    getSortResult(){
        this.sortResultArray=ArrayUtil.clone(this.dataArray);
        for(let i=0;i<this.orignalCheckedArray.length;i++){
            let item=this.orignalCheckedArray[i];
            let index=this.dataArray.indexOf(item);
            this.sortResultArray.splice(index,1,this.state.checkedArray[i]);
        }
    }
    onSave(isCheck){
        if(!isCheck&&ArrayUtil.isEqual(this.orignalCheckedArray,this.state.checkedArray)){
            this.props.navigator.pop();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigator.pop();
    }
    onBack(){
        if(ArrayUtil.isEqual(this.orignalCheckedArray,this.state.checkedArray)){
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {text: 'Cancel', onPress: () => {this.props.navigator.pop();}, style: 'cancel'},
                {text: 'OK', onPress: (isCheck) => {this.onSave(isCheck)}},
            ]
        )
    }
    render(){
        let rightButton=<TouchableOpacity
            onPress={()=>this.onSave()}>
            <View style={{margin:10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>;
        let order = Object.keys(this.state.checkedArray) //Array of keys
        return <View style={styles.container}>
            <NavigationBar
                title={'排序'}
                style={{
                    backgroundColor:'#2196F3'
                }}
                leftButton={ViewUtil.getLeftButton(()=>{this.onBack()})}
                rightButton={rightButton}
            />
            <SortableListView
                style={{ flex: 1 }}
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                renderRow={row => <SortCell data={row} />}
            />
        </View>
    }
}

class SortCell extends Component{
    render(){
        return (<TouchableHighlight
            underlayColor={'#eee'}
            delayLongPress={500}
            style={styles.item}
            {...this.props.sortHandlers}
            >
                <View style={styles.row}>
                    <Image style={styles.image} source={require('../../../res/images/collect.png')}></Image>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>)
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
    item:{
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        tintColor:'#2196F3',
        height:16,
        width:16,
        marginRight:10
    }
});