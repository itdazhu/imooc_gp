/**
 * Created by fanyafang on 2018/1/24.
 */

export default class DataRepository{
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    resolve(result);
                })
                .then(error=>{
                    reject(error);
                })
        })
    }
}