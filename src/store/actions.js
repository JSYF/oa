
export default {
    updateUser({ commit }) {

        const userInfo =
            {
                "access_token": "ccceaab7-5aa9-4633-9e54-befa03ecf499", "token_type": "bearer", "refresh_token": "2e2fb325-9bb3-4ad2-8d76-f838bd68f828", "expires_in": 89999, "scope": "app", "realname": "测试", "company_id": 12345, "company_name": "葡萄科技公司", "userStatus": 0, "userId": 12345678910, "sex": 1, "pic": "http://ovu972ix7.bkt.clouddn.com/12345678910.jpg", "ismanager": 1, "phone": "12222222222", "userSig": "eJxFkF1PgzAUhv8L10bb8m3iBYNFMOJmxKDeNA0t25HZYenGmPG-W8iIt8*Tk-d9z49VPL5cs7YFTpmmtuLWrYWsqwmLUwtKUFZroQwmbkgQmuVRqA72cuQIu5jYCP1L4EJqqGG6M85xPT8I8aw72BieL1-jbNHo7ZCSNYsWnz1*X8XFM-aC-H51QFvZB-yhK97yckcysotgGfWw4VGSVbE4Dao4f6Q**Va1xHVyU665o0XalYl3TIOn5m4O4w2dBo5VHNPRDv3QvUgNX2LkZoBPHILsC2dVtT9ITfXQiukjv39Ge1e8", "sdkAppid": 1400039795, "accountType": "15187"
            }

        return new Promise((resolve, reject) => {
            commit("UPDATE_USERINFO", userInfo);
            resolve();
        });


    }
}