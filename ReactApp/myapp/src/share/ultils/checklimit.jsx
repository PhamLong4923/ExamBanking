import modeconfig from "../constrants/bankmode";
import { jwtDecode } from "jwt-decode";
import { getLocalStorageItem } from "../../services/LocalStorage";

function checkLimit(type, number) {
    const token = getLocalStorageItem('token');

    if (!token) {
        return true;
    }

    const decodedToken = jwtDecode(token);
    const bankMode = decodedToken.bankmode;

    const limit = bankMode ? modeconfig.bankMode[bankMode][type + 'Limit'] : null;
    return number >= limit;
}

export default checkLimit;