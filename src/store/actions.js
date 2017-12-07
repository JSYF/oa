
export default {
    updateUser({ commit }) {

        const userInfo =
            {
                "access_token": "a6ef92c2-21be-4685-ae31-f8acde232f70", "token_type": "bearer", "refresh_token": "c3d00982-d971-48b9-a97f-8fdc58a45c83", "expires_in": 73025, "scope": "app", "realname": "火腿肠", "company_id": 12345, "company_name": "葡萄科技公司", "userStatus": 0, "userId": 10000000081, "sex": 1, "pic": "http://ovu972ix7.bkt.clouddn.com/10000000081.jpg", "ismanager": 1, "phone": "18813974681", "userSig": "eJxFkF1PwjAUhv-LbjXkdLUbNfFiQSAjYBZ1K-SmGWsLFfddF4nxv7stI57L58nJed-z47xv32ZpVRkpUitwI51HB5z7EavvyjRKpNqqpscuoS7ATXaqaU1ZDBwQQS4G*JdGqsIabcY9BNPM0aRbc*r5bhkvwvUuyvAq3iz46RDarL57jWSHz*H6w4NLHkuWWE78zb6J8sAsg6tkXfASbwNOjvtVCS1L6Bz4c12rRGvesQMr8Geo6bF8uh2TFzEWHKI89DEw9SmZpDW5GnhfwHM9D-kTT7Os-CqssNdKjR-5-QMus1fA", "sdkAppid": 1400039795, "accountType": "15187"
            }
        return new Promise((resolve, reject) => {
            commit("UPDATE_USERINFO", userInfo);
            resolve();
        });


    }
}