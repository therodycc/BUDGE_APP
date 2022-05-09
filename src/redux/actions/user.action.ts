import userProvider from "../../providers/user/user.provider";
import { userTypes } from "../types/user.types";

export const getMeAction = () => {
    return (dispatch: Function) => {
        userProvider.getMe()
            .then((res) => {
                dispatch({
                    type: userTypes.GET_USER,
                    payload: res?.data
                });
            })
            .catch((error) => error);
    }
}