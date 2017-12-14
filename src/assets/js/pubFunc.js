import moment from 'moment';
export default {
    install: function (Vue) {
        Vue.prototype.getUser = function () {
            return new Promise((resolve, reject) => {
                resolve({
                    "access_token": "5333c2c8-e384-47e9-9124-02aee2c71969",
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
                })
            });
        };
        /**
         * 封装post请求
         * @param {url,postData} obj 
         */
        Vue.prototype.$post = function (obj) {
            return new Promise((resolve, reject) => {
                this.$http.post(baseURL + obj.url, obj.postData).then((result) => {
                    console.log(result);
                    if (result.data.status == true) {
                        resolve(result.data.data);
                    } else {
                        throw result.data
                    }

                }, (err) => {
                    if (err.status == 401) {
                        console.log("token失效");
                    }
                    throw err;
                })
                    .catch((e) => {
                        reject(e);
                    })
            })
        }
        Vue.prototype.$getMan = function (obj) {
            return new Promise((resolve, reject) => {
                resolve({ realname: "雷神", imgsrc: "http://www.w3school.com.cn/i/eg_tulip.jpg" })
            })
        }
        Vue.filter("timeFilter", function (value, formatStr) {
            if (moment(value).isSame(new Date(), "year")) {
                return moment(value).format(formatStr);
            } else {
                return moment(value).format("YYYY.MM.DD HH:mm")
            }
        });
    }
}