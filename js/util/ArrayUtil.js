/**
 * Created by fanyafang on 2018/1/25.
 */

/*
* 更新数组，若元素存在就删除，然后添加进数组
*/
export default class ArrayUtil{
    static updateArray(array,item){
        for(let i=0,len=array.length;i<len;i++){
            var temp=array[i];
            if(temp===item){
                this.chanageValues.splice(i,1);//删除
                return;
            }
        }
        array.push(item);
    }
}