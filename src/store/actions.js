
export default {
    updateUser({ commit }) {

        const userInfo =
            { "access_token": "5176e175-2b02-411b-a4ed-ec401deb1505", "token_type": "bearer", "refresh_token": "c3d00982-d971-48b9-a97f-8fdc58a45c83", "expires_in": 89999, "scope": "app", "realname": "火腿肠", "company_id": 12345, "company_name": "葡萄科技公司", "userStatus": 0, "userId": 10000000081, "sex": 1, "pic": "http://ovu972ix7.bkt.clouddn.com/10000000081.jpg", "ismanager": 1, "phone": "18813974681", "userSig": "eJxFkNFOgzAUht*FW407pVRW75YxtGwzGBczrpoCHXQIdKwgxvjuAmHxXH5f-pz-nB-rsHt-EFqrlAvDcZNaTxZY9xOWvVaN5OJkZDNgm1Ab4CY72VxVXY0cEEE2BviXKpWVUSc15RDMs0Szvqps4PtNtGZvHkRQn5kI4ksbiXbB3O2dNnkQut5WZr704pfjIe8**tU*Y-lqF4o*cZfnsGA1OIvPS*D7apN9lYV47IKjWadt*Rqh8DnGt2VpwacDxyrOUANTl5JZGlXKkROECaGUODMXSVK3leHmW8vpI79-UgFYAA__", "sdkAppid": 1400039795, "accountType": "15187" }
        return new Promise((resolve, reject) => {
            commit("UPDATE_USERINFO", userInfo);
            resolve();
        });


    }
}