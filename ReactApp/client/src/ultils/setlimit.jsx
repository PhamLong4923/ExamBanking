import limit from "../share/limit";
import store from "../redux-setup/store";
import { getBankMode } from "../services/api";



function setLimit(type, number) {
    const bankModef = async () => {
        try {
            const response = await getBankMode();
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
    const token = store.getState().token;

    if (!token) {
        return true;
    }


    const bankMode = parseInt(bankModef());

    const islimit = bankMode ? limit.bankMode[bankMode][type + 'Limit'] : null;
    console.log(islimit + ':' + bankMode + ':' + token);
    return number >= islimit;
}

export default setLimit;