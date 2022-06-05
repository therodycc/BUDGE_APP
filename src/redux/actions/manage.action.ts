import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { ManageI } from "../../interfaces/manage/manage.interface";
import utilitiesProvider from "../../providers/utilities/utilities.provider";
import { ManageTypes } from "../types/manage.type";

export const getManageAction = () => {
    return (dispatch: Function) => {
        utilitiesProvider
            .getAll()
            .then((res) => {
                dispatch({
                    type: ManageTypes.GET_ALL,
                    payload: res?.data,
                });
            })
            .catch((err) => err);
    };
};

export const removeManageAction = (uuid: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        utilitiesProvider
            .remove(uuid)
            .then((res) => {
                if (res.error)
                    return sweetAlert.alert("Error", res?.error?.message, "error");
                sweetAlert.alert("Success", "Deleted!", "success");
                dispatch({
                    type: ManageTypes.REMOVE_ITEM,
                    payload: getStore().manage.manage.filter(
                        (item: any) => item.uuid !== uuid
                    ),
                });
            })
            .catch((error) => error);
    };
};

export const updateManageAction = (uuid: string, data: ManageI) => {
    return async (dispatch: Function, getStore: Function) => {
        utilitiesProvider
            .update(uuid, data)
            .then((res) => {
                if (res.error)
                    return sweetAlert.alert("Error", res?.error?.message, "error");
                sweetAlert.alert("Success", "Updated!", "success");
                dispatch({
                    type: ManageTypes.UPDATE_ITEM,
                    payload: getStore().manage.manage.map((item: ManageI) =>
                        item.uuid == uuid ? {
                            ...item,
                            ...data,
                            ...(data.expense && { expense: +data.expense }),
                        } : item
                    ),
                });
            })
            .catch((error) => error);
    };
};
