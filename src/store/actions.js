
export default {
    updateUser({ commit }) {

        const userInfo =
            { "access_token": "2320b3d8-6788-463f-9bd0-f48386f46b8e", "token_type": "bearer", "refresh_token": "c3d00982-d971-48b9-a97f-8fdc58a45c83", "expires_in": 89999, "scope": "app", "realname": "火腿肠", "company_id": 12345, "company_name": "葡萄科技公司", "userStatus": 0, "userId": 10000000081, "sex": 1, "pic": "http://ovu972ix7.bkt.clouddn.com/10000000081.jpg", "ismanager": 1, "phone": "18813974681", "userSig": "eJxFkF1PgzAUhv8Ltxo9bddATbxQ3DLixz7YIvOmqbSDogNSOgYz-neBsHgunydvznvOj7N5CW9EWWrJheXESOfOAed6wKoptVFc7K0yHcaUYYCLrJWpdJH3HBBFmAD8Sy1VbvVeDzkE43ho1JVOOv463frB6ul5O0eP6h3yLDoqyE4PLkt2V*tlWs9rL9TRsnb9M1u97cJTkMzWi9ltCu3n9wKnICET0YYeIiDBh6WNjKdtUiC-MkHj3V*WyS8*HNhXmXQ1CHMZHaXVB9VzigiaUIzxyEUcF8fcctuWavjI7x-*HFdO", "sdkAppid": 1400039795, "accountType": "15187" }

        return new Promise((resolve, reject) => {
            commit("UPDATE_USERINFO", userInfo);
            resolve();
        });


    }
}