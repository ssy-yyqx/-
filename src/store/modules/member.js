// 按需导入
import {
  getMember
} from '../../request/member'

export default {
  namespaced: true,
  state() {
    return {
      getMemberList: []
    }

  },
  mutations: {
    // 初始化
    getMemberListInit(state, list) {
      state.getMemberList = list
    }
  },
  actions: {
    getMemberListAction({
      commit
    }) {
      getMember().then(list => {
        if (list) {
          commit('getMemberListInit', list)
        }
      })
    }
  }
}
