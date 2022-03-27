import userProvider from "../../providers/user/user.provider";
import { userTypes } from "../types/user.types";

export const getUserAction = () => {
    return (dispatch: Function) => {
        userProvider.getAll()
            .then((res) => {
                console.log(res)
                dispatch({
                    type: userTypes.GET_USER,
                    payload: { user: res?.data }
                });
            })
            .catch((error) => error);
    }
}