// 导入axios
import axios from '../utils/http'

// 获取数据列表
export async function getBannerList(){
    const res = await axios.get('/bannerlist')
    if(res.code===200){
        return res.list
    }
    return false;
}