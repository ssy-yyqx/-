// 存储一些数据请求方法
// 导入axios
import axios from '../utils/http';

// 获取角色列表
export async function getRoleList(){
    const res = await axios.get('rolelist')
    if(res.code===200){
        return res.list;
    }
    return false;
}