import { serverMutation } from "../core/server";

export const payment = async (data, customToken = null) => {
    return await serverMutation('/payment', 'POST', data, customToken);
}