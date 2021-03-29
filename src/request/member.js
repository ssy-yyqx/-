// 导入axios
import axios from '../utils/http'

// 默认导出
export async function getMember(){
    const res = await axios.get('/memberlist');
    if(res.code===200){
        return res.list
    }
    return false;
}