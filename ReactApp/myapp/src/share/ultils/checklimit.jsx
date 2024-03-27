import modeconfig from "../constrants/bankmode";
import { jwtDecode } from "jwt-decode";
import store from "../../redux/store";

function checkLimit(type, number) {
    const token = store.getState().token;

    if (!token) {
        return true;
    }

    const decodedToken = jwtDecode(token);
    const bankMode = decodedToken.bankmode;

    const limit = bankMode ? modeconfig.bankMode[bankMode][type + 'Limit'] : null;
    console.log(limit);
    return number >= limit;
}

export default checkLimit;