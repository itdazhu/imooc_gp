/**
 * Created by fanyafang on 2018/1/24.
 */
import React,{Component} from 'react';
import {
    AsyncStorage
}from 'react-native';

export default class DataRepository{

    fetchRepository(url){
        return new Promise((resolve,reject)=>{
            this.fetchLocalRepository(url)
                .then(result=>{
                    if(result){
                        resolve(result);
                    }else{
                        this.fetchNetRepository(url)
                            .then(result=>{
                                resolve(result);
                            })
                            .catch(e=>{
                                reject(e);
                            })
                    }
                })
                .catch(e=>{
                    this.fetchNetRepository(url)
                        .then(result=>{
                            resolve(result);
                        })
                        .catch(e=>{
                            reject(e);
                        })
                })
        })
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalRepository(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                    try{
                        resolve(JSON.parse(result));
                    }catch(e){
                        reject(e);
                    }
                }else{
                    reject(error);
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param url
     * @returns {Promise}
     */
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    if(!result){
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result.items);
                    this.saveRepository(url,result.items);
                })
                .then(error=>{
                    reject(error);
                })
        })
    }

    saveRepository(url,items,callBack){
        if(!url||!items)return;
        let wrapData={items:items,update_data:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
    }

    /**
     * 判断数据是否过时
     * @param longTime 数据的时间戳
     * @returns {boolean}
     */
    checkDate(longTime){
        return false;
        let cDate=new Date();//目前时间
        let tDate=new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth()!==tDate.getMonth())return false;
        if(cDate.getDay()!==tDate.getDay())return false;
        if(cDate.getHours()-tDate.getMonth()>4)return false;
        return true;
    }
}