const UPDATE_USERINFO = "UPDATE_USERINFO"
export default {
    [UPDATE_USERINFO](state, userInfo) {
        state.userInfo = userInfo
    }
}