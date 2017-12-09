
export default {
    updateUser({ commit }) {

        const userInfo =
            { "access_token": "eda21ab8-7b35-4f38-8b2e-1a576c798592", "token_type": "bearer", "refresh_token": "c3d00982-d971-48b9-a97f-8fdc58a45c83", "expires_in": 89999, "scope": "app", "realname": "火腿肠", "company_id": 12345, "company_name": "葡萄科技公司", "userStatus": 0, "userId": 10000000081, "sex": 1, "pic": "http://ovu972ix7.bkt.clouddn.com/10000000081.jpg", "ismanager": 1, "phone": "18813974681", "userSig": "eJxFkF1PgzAUhv8LtxrTUqpg4g2bsEZmQOvHXUPWFk8IpYNuYxr-u0BYPJfPk5PzvufH49nrTWktSFE6QTrp3XvIu56xGix0SpTaqW7EPo18hC7yqLoeWjNxhCn2CUL-EqQyDjTMexgtE*JF91CNfPv4tmLFmtg014n7-mw0yMTJMD2*ZJzF*6vMPtuvtsBwu003ZuAnVr0XZ9PnG83zABf7jrMnwhKd1ll8GPq8itcfNQ1o3axO7OFyTNZiLjhFCcYYJLqL6CIdNGriY4EQYUyChZe7XXswTrizVfNHfv8AkclYPw__", "sdkAppid": 1400039795, "accountType": "15187" }

        return new Promise((resolve, reject) => {
            commit("UPDATE_USERINFO", userInfo);
            resolve();
        });


    }
}