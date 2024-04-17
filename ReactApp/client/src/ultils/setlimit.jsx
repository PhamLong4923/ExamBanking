import limit from "../share/limit";
import store from "../redux-setup/store";
import { getBankMode } from "../services/api";

async function setLimit(type, number) {
    const token = store.getState().token;

    if (!token) {
        return true;
    }

    try {
        const bankModeResponse = await getBankMode();
        const bankMode = parseInt(bankModeResponse.data);

        const islimit = bankMode !== null ? limit.bankMode[bankMode][type + 'Limit'] : null;
        console.log(islimit + ':' + bankMode);
        return (number >= islimit);
    } catch (error) {
        console.log(error);
        return -1;
    }
}

export default setLimit;
