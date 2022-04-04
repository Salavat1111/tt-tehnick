import {get} from "axios";
import {serverUrl} from "../common/AppConstants";
import Cookies from "js-cookie";

class OrderService {

    getOrders = async () => {
        const url = serverUrl + `/fixer/api/user/orders`;
        const res = await get(url, {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'X-CSRF-TOKEN': Cookies.get('csrf_token')
            }
        });
        return res.data;
    }

    getParameter = (order, attrId) => {
        if (order?.parameters)
            for (let parameter of order.parameters) {
                if (parameter.attrId === attrId) return parameter;
            }
        return null
    }

    getParameterValue = (order, attrId) => {
        return this.getParameter(order, attrId)?.value;
    }

}

export default OrderService;