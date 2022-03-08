import axios, {patch} from "axios";
import {serverUrl, userSettingsUrl} from "../common/AppConstants";
import Cookies from "js-cookie";

async function updateParameterValue(parameter, value) {
    console.log("asdasd")
    console.log(value)
    await patch(serverUrl + '/fixer/api/user/p', {
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

export async function getCurrentUserInfo() {
    const url = serverUrl + `/fixer/api/user/currentUser`;
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'X-CSRF-TOKEN': Cookies.get('csrf_token')
        }
    });
    return res.data;
}

export async function getUserModel() {
    const url = serverUrl + `/fixer/api/user/model`;
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'X-CSRF-TOKEN': Cookies.get('csrf_token')
        }
    }).catch((e) =>  {
        console.log("error")
        console.log(e)
    });
    return res.data;
}

async function updateUser(user) {
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
    }).catch((e)=>{ console.log("cant updateuser" + e)
    return e})
}




export {updateParameterValue, updateUser};
// export default getCurrentUserInfo;