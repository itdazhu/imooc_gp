/**
 * Created by fanyafang on 2018/1/24.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity,
    RefreshControl,
    DeviceEventEmitter
}from 'react-native';

import NavigationBar from  '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAGE_LANGUAGE} from'../expand/dao/LanguageDao';
import RepositoryDetail from './RepositoryDetail'
import ProjectModel from '../model/ProjectModel'
import FarivateDao from '../expand/dao/FarivateDao'
import Utils from '../util/Utils'

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';

var farivateDao =new FarivateDao("FLAG_POPULAR")
export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.languageDao=new LanguageDao(FLAGE_LANGUAGE.flag_key);
        this.state={
            languages:[]
        }
    }
    componentDidMount(){
       this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then((result)=>{
                this.setState({
                    languages:result
                })
            })
            .then((error)=>{
                console.log(error);
            })
    }
    render(){
        let content=this.state.languages.length>0?
            <ScrollableTabView
            tabBarBackgroundColor='#2193F3'
            tabBarActiveTextColor='white'
            tabBarInactiveTextColor='mintcream'
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
            renderTabBar={()=><ScrollableTabBar/>}
            >
            {
                this.state.languages.map((result,i,arr)=>{
                    let lan=arr[i];
                    return lan.checked? <PopularTab key={i} tabLabel={lan.name} {...this.props}>{lan.name}</PopularTab> :null;
                })
            }
        </ScrollableTabView> :null;

        return <View style={styles.container}>
            <NavigationBar
                title={'最热'}
                style={{
                    backgroundColor:'#2196F3'
                }}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}

            />
            {content}
        </View>
    }
}

class PopularTab extends Component{
    constructor(props){
        super(props);
        this.dataRepository = new DataRepository();
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:false,
            farivateKeys:[]
        }
    }
    componentDidMount(){
        this.loadData();
    }
    flushFarivateState(){
        let projectModels=[];
        let items=this.items;
        for(let i=0;i<items.length;i++){
            projectModels.push(new ProjectModel(items[i],Utils.checkFarivate(items[i],this.state.farivateKeys)));
        }
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(projectModels),
            isLoading:false//刷新后置为false
        })

    }
    getFarivateKeys(){
        farivateDao.getFavoriteKeys()
            .then(keys=>{
                if(keys){
                    this.setState({
                        farivateKeys:keys
                    })
                }
                this.flushFarivateState();
            })
            .catch(e=>{
                this.flushFarivateState();
            })
    }
    loadData(){
        //开始刷新
        this.setState({
            isLoading:true,
        });
        let url=URL+this.props.tabLabel+QUERY_STR;
        this.dataRepository.fetchRepository(url)
            .then(result=>{
                this.items=result&&result.items? result.items :result?result:[];
                this.getFarivateKeys();
                if(result&&result.update_data&&!this.dataRepository.checkDate(result.update_data)){
                    DeviceEventEmitter.emit('showToast','数据过时');
                    return this.dataRepository.fetchNetRepository(url);
                }else{
                    DeviceEventEmitter.emit('showToast','显示缓存数据');
                }
            })
            .then(items=>{
                if(!items||items.length===0)return;
                this.items=items;
                this.getFarivateKeys();
                DeviceEventEmitter.emit('showToast','显示网络数据');
            })
            .catch(error=>{
                console.log(error);
            })
    }
    onSelect(projectModel){
        this.props.navigator.push({
            component:RepositoryDetail,
            params:{
                projectModel:projectModel,
                ...this.props
            }
        })
    }
    onFarivate(item,isFarivate){
        if(isFarivate){
            farivateDao.saveFavoriteItem(item.id.toString(),JSON.stringify(item));
        }else{
            farivateDao.removeFavoriteItem(item.id.toString());
        }
    }
    renderRow(projectModel){
        return <View>
            <RepositoryCell
                key={projectModel.item.id}
                onSelect={()=>this.onSelect(projectModel)}
                projectModel={projectModel}
                onFarivate={(item,isFarivate)=>this.onFarivate(item,isFarivate)}
            />

        </View>
    }
    render(){
        return <View style={styles.container}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={(item)=>this.renderRow(item)}
                      refreshControl={
                          <RefreshControl
                              refreshing={this.state.isLoading}
                              onRefresh={()=>this.loadData()}
                              colors={['#2196F3']}//Android下的颜色
                              tintColor={'#2196F3'}//iOS下的颜色
                              title={'Loading'}
                              titleColor={'#2196F3'}
                          />}
            />
        </View>
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    }
})