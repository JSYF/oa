const state = {
    detailsParam: null,
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
    SETAPPROVEPARAMS(state, params) {
        state.detailsParam = params;
    },
    SAVEAPPROVELISTPOSITION(state, params) {
        state.listScrollTop = params;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}