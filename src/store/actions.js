
export default {
    updateUser({ commit }) {

        const userInfo =
            {
                "access_token": "d2d5b571-bc5a-4127-bab9-be1e95fa34cd",
                "token_type": "bearer",
                "refresh_token": "53c614ab-1037-4576-b5f1-7d584c558629",
                "expires_in": 89999,
                "scope": "app",
                "realname": "火腿肠",
                "company_id": 12345,
                "company_name": "葡萄科技公司",
                "userStatus": 0,
                "userId": 10000000081,
                "sex": 1,
                "pic": "http://ovu972ix7.bkt.clouddn.com/10000000081.jpg",
                "ismanager": 1,
                "phone": "18813974681",
                "userSig": "eJxFkF1PwjAUhv-Lrom2HQ3WOxwNjIJKXESumtJ2tDD21U4kxv-Otox4Lp8nb857zm*QrD4eRFlaxYXnYa2C5wAEox7rn9LWmovU67rFCBMEwF1*69rZIu84gBiiEIB-aZXOvU1tn4NgmCc4aGcPLV-TXRRvZnR6dIc0lJnJ4PhsZHVZLfAudvpdRqdtlTi2VjHVuKGX2EzfXkWhPiOUbDfef2UOZ-JxiZsrYpIwNmdNtTdz84IRofdl6sT7A7sq47ZGSCYED9Lbs*44hpBAMgFo4ELKosk999dS9x-5uwGOdVgo",
                "sdkAppid": 1400039795,
                "accountType": "15187"
            }
        return new Promise((resolve, reject) => {
            commit("UPDATE_USERINFO", userInfo);
            resolve();
        });


    }
}