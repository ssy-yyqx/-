// 导入axios
import axios from '../utils/http'

// 获取数据列表
export async function getSeckill(){
    const res = await axios.get('/secklist');
    if(res.code===200){
        return res.list
    }
    return false
}