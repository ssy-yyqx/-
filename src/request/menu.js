import axios from '../utils/http';
// 获取菜单列表   按需导出
export async function getMenuList(){
    const res = await axios.get('/menulist?istree=1');
    if(res.code===200){
        return res.list;
    }
    console.log(res.list);    
    return false;
}