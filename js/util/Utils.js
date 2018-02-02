/**
 * Created by fanyafang on 2018/2/2.
 */
export  default class Utils{
    /**
     * 检查该item有没被收藏过
     * @param item
     * @param items 收藏项目的key集合
     * @returns {boolean}
     */
    static checkFarivate(item,items){
        for(let i=0;i<items.length;i++){
            if(item.id.toString()===items[i]){
                return true;
            }
        }
        return false;
    }
}
