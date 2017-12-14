const state = {
    listPageNum: 5,
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
    remindTime: {
        remind: "",
        reday: ""
    },
    detailsParams: null
}

const mutations = {
    //存储提醒时间数据
    SAVEREMINDTIME(state, params) {
        state.remindTime = params;
    },
    // 存储任务详情参数
    SAVEDETAILSPARAMS(state, params) {
        state.detailsParams = params;
    },
    //存储发起任务的表单数据
    SAVELUNCHINGFORMDATA(state, params) {
        console.log("params", params);
        state.lunchingFormData = params;
    }
}


export default {
    state,
    mutations
}