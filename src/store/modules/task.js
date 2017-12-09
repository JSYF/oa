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
    listData: [
        {//我发起的
            //未完成
            taskingData: {
                listData: [],
                startNum: 0,
                status: 1
            },
            //已完成
            taskedData: {
                listData: [],
                startNum: 0,
                status: 3
            }
        },
        {//我负责的
            //未完成
            taskingData: {
                listData: [],
                startNum: 0,
                status: 1
            },
            //已完成
            taskedData: {
                listData: [],
                startNum: 0,
                status: 3
            }
        },
        {//我执行的
            //未完成
            taskingData: {
                listData: [],
                startNum: 0,
                status: 1
            },
            //已完成
            taskedData: {
                listData: [],
                startNum: 0,
                status: 3
            }
        },]
}

const mutations = {
    //设置任务列表数据
    SETLISTDATA_TASK(state, params) {
        state.listData[param.index] = param.data;
    }
}


export default {
    state
}