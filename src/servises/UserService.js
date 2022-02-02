import axios, {patch} from "axios";
import {serverUrl} from "../common/AppConstants";
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
export default updateParameterValue;
// export default getCurrentUserInfo;