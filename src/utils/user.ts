
import {Storage} from "utils/storage";
import service from "utils/serviceApi/index";

const User = {
    token: () => {
        return Storage.getItem("token")
    },
    logout: () =>{
        service.logout().then((data:any) => {
            const user = ['userInfo', 'token'];
            for(let item of user){
                window.localStorage.removeItem(item);
            }
            const path = window.location.pathname;
            return window.location.href = window.location.origin + '/login#'+ path ;
        })
    }
};

export default User
