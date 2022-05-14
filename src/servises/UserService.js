import axios, {patch, post} from "axios";
import {pageAfterLogin, serverUrl} from "../common/AppConstants";
import Cookies from "js-cookie";

class UserService {

    _userServiceApiBase = '/fixer/api/user'

    updateParameterValue = async (parameter, value) => {
        console.log("updateParameterValue")
        console.log(value)
        await patch(serverUrl + this._userServiceApiBase +'/p', {
            phoneNumber: "89276976454",
            parameters: [{
                name: parameter,
                value: value
            }]
        }, {
            headers: {
                Authorization: "Bearer " + Cookies.get('access_token'),
                'X-CSRF-TOKEN': Cookies.get('csrf_token'),
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": true
            }
        }).then(response => {
            console.log('response.data')
            console.log(response)
        });
    };

    getCurrentUserInfo = async () => {
        const url = serverUrl + `/fixer/api/user/currentUser`;
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'X-CSRF-TOKEN': Cookies.get('csrf_token')
            }
        });
        return res.data;
    }

    getUserModel = async () => {
        const url = serverUrl + `/fixer/api/user/model`;
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'X-CSRF-TOKEN': Cookies.get('csrf_token')
            }
        }).catch((e) => {
            console.log("error")
            console.log(e)
        });
        return res.data;
    }

    updateUser = async (user) => {
        console.log("updateUser")
        return await axios.patch(serverUrl + `/fixer/api/user/update`, user, {
            headers: {
                Authorization: "Bearer " + Cookies.get('access_token'),
                'X-CSRF-TOKEN': Cookies.get('csrf_token')
            }
        }).then(response => {
            console.log('response.data')
            console.log(response.data)
            return response.data
            // window.location = userSettingsUrl
        }).catch((e) => {
            console.log("cant updateuser" + e)
            return e
        })
    }

    createOrder = async (order) => {
        console.log("createOrderFunc")
        return await axios.post(serverUrl + `/fixer/api/order/create`, order, {
            headers: {
                Authorization: "Bearer " + Cookies.get('access_token'),
                'X-CSRF-TOKEN': Cookies.get('csrf_token')
            }
        }).then(response => {
            console.log('response.data')
            console.log(response.data)
            return response.data
        }).catch((e) => {
            console.log("cant create order" + e)
            return e
        })
    }

    login = async (phoneNumber, password) => {
        post(
            serverUrl + "/auth/login", {
                username: phoneNumber,
                password: password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": true
                }
            }
        ).then(function (response) {
            console.log('try to auth');
            if (response.data.accessToken) {
                Cookies.set('access_token', response.data.accessToken);
                console.log('Authenticated');
                window.location.href = pageAfterLogin;//may be need change to react redirect or history
            } else {
                console.log('auth failed: no accessToken');

            }
        }).catch(function (error) {
            console.log('Error on Authentication');
            console.log(error);
        });
    };

    creteUser = async (user) => {
        console.log("createUser")
        await axios.post(serverUrl + `/auth/register`, user, {
            headers: {
                Authorization: "Bearer " + Cookies.get('access_token'),
                'X-CSRF-TOKEN': Cookies.get('csrf_token')
            }
        }).then(response => {
            console.log('response.data')
            console.log(response.data)
            Cookies.set('access_token', response.data.accessToken);
            console.log('Authenticated');
            window.location.href = pageAfterLogin;//may be need change to react redirect or history
        }).catch((r) =>{
            console.log("creteUser failed")
            console.log(r)
        })
    }

}


export default UserService;