const state = {
    listPageNum: 10,
    slideData: [
        {
            id: 1,
            text: "未完成"
        },
        {
            id: 3,
            text: "已完成"
        }
    ],
    lunchingFormData: null,
    detailsParams: null,
    taskCheckData: null,
    remindToDetails: false,
    detailsToRemindData: null,
    listIndex: 0,
    listRefresh: false,
    listScrollTop: [0, 0, 0]
}

const mutations = {
    //列表index
    SAVELISTINDEX_TASK(state, params) {
        state.listIndex = params;
    },
    //列表高度
    SAVETASKLISTHEIGHT(state, params) {
        state.listScrollTop = params;
    },
    LISTSHOULDREFRESH(state, params) {
        state.listRefresh = params;
    },
    // 存储任务详情参数
    SAVEDETAILSPARAMS(state, params) {
        state.detailsParams = params;
    },
    //存储发起任务的表单数据
    SAVELUNCHINGFORMDATA(state, params) {
        state.lunchingFormData = params;
    },
    //存储验收任务参数
    SAVETASKCHECKDATA(state, params) {
        state.taskCheckData = params;
    },
    //存储任务详情到设置提醒页面所需参数
    SAVEDETAILSTOREMINDDATA(state, params) {
        state.detailsToRemindData = params;
    },
    //任务详细页面是否需要刷新
    SAVEREMINDToDETAILS(state, params) {
        state.remindToDetails = params;
    }
}


export default {
    state,
    mutations
}