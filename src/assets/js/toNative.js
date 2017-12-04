
const obj = {
    toPage(type) {
        console.log(type);
        if (type == 1) {
            window.location = "#/approve";
        } else {
            window.location = "#/task";
        }
    }
}


window.toNativeObj = obj;