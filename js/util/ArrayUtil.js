/**
 * Created by fanyafang on 2018/1/25.
 */

export default class ArrayUtil{
    /**
     * 更新数组，若元素存在就删除，如果不存在就添加进数组
     * @param array
     * @param item
     */
    static updateArray(array,item){
        for(let i=0,len=array.length;i<len;i++){
            var temp=array[i];
            if(temp===item){
                array.splice(i,1);//删除
                return;
            }
        }
        array.push(item);
    }
    /**
     * 克隆一个数组
     * @param from
     * @returns {Array}
     */
    static clone(from){
        if(!from)return [];
        let newArray=[];
        for(let i=0;i<from.length;i++){
            newArray[i]=from[i];
        }
        return newArray;
    }

    /**
     * 判断两个数组的是否相等
     * @return boolean true 数组长度相等且对应元素相等
     * */
    static isEqual(arr1,arr2){
        if(!(arr1&&arr2))return false;
        if(arr1.length!=arr2.length)return false;
        for(let i=0,l=arr1.length;i<l;i++){
            if (arr1[i]!=arr2[i])return false;
        }
        return true;
    }

    /**
     * 从数组中删除元素
     * @param arr
     * @param item
     */
    static  remove(arr,item){
        if(arr.length==0)return;
        for(let i=0;i<arr.length;i++){
           if(arr[i]===item)arr.splice(i,1);
        }
    }
}