const state = {
    lunchingParam: null,
    willUpdate: { type: 1 },
    listIndex: 0,
    listSlideIndex: [0, 0, 0],
    detailsParam: null,
    listPageNum: 5,
    listData: [{
        approvingData: {
            //未审批数据
            listData: [],
            startNum: 0,
            status: 1
        },
        approvedData: {
            //已审批数据
            listData: [],
            startNum: 0,
            status: 0
        }
    }, {
        approvingData: {
            //未审批数据
            listData: [],
            startNum: 0,
            status: 1
        },
        approvedData: {
            //已审批数据
            listData: [],
            startNum: 0,
            status: 0
        }
    }, {
        approvingData: {
            //未审批数据
            listData: [],
            startNum: 0,
            status: 1
        },
        approvedData: {
            //已审批数据
            listData: [],
            startNum: 0,
            status: 0
        }
    }],
    slideData: [
        {
            id: 0,
            text: "待审批"
        },
        {
            id: 1,
            text: "已审批"
        }
    ],
    listScrollTop: [0, 0, 0]
}
const getters = {

}
const actions = {
    setApproveParams({ commit }, params) {
        commit("SETAPPROVEPARAMS", params);
    }
}

const mutations = {
    //设置进入某条发起某条审批的数据
    SETLUNCHINGPARAM(state, params) {
        state.lunchingParam = params;
    },
    SETAPPROVEPARAMS(state, params) {
        state.detailsParam = params;
    },
    SAVEAPPROVELISTPOSITION(state, params) {
        state.listScrollTop = params;
    },
    //设置审批列表位置
    SETLISTINDEX_APPROVE(state, index) {
        state.listIndex = index;
    },
    SETLISTSLIDEINDEX(state, arr) {
        state.listSlideIndex = arr;
    },
    SETLISTDATA(state, param) {
        state.listData[param.index] = param.data;
    },
    SETWILLUPDATE(state, param) {
        state.willUpdate = param;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}