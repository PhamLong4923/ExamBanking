import limit from "../share/limit";
import { jwtDecode } from "jwt-decode";
import store from "../redux-setup/store";

function setLimit(type, number) {
    const token = store.getState().token;

    if (!token) {
        return true;
    }

    const decodedToken = jwtDecode(token);
    const bankMode = decodedToken.bankmode;

    const islimit = bankMode ? limit.bankMode[bankMode][type + 'Limit'] : null;
    console.log(islimit + ':' + bankMode + ':' + token);
    return number >= islimit;
}

export default setLimit;