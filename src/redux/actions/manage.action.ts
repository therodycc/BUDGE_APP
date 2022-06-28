import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { ManageI } from "../../interfaces/manage/manage.interface";
import { TypeTable } from "../../interfaces/utility/utilily.type";
import manageProvider from "../../providers/utilities/utilities.provider";
import { ManageTypes } from "../types/manage.type";

export const getManageAction = () => {
    return (dispatch: Function) => {
        manageProvider
            .getAll()
            .then((res) => {
                let added: any = [];
                res.data.forEach((item: any) => {
                    item.forEach((element: any) => {
                        added.push(element);
                    });
                });
                dispatch({
                    type: ManageTypes.GET_ALL,
                    payload: added,
                });
            })
            .catch((err) => err);
    };
};

export const removeManageAction = (uuid: string, type: TypeTable) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        manageProvider
            .updateAction(uuid, type, { inMonth: false })
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
                sweetAlert.alert("Success", "Removed of this month!", "success");
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

export const updateManageAction = (uuid: string, type: TypeTable, data: ManageI) => {
    return async (dispatch: Function, getStore: Function) => {
        manageProvider
            .updateAction(uuid, type, data)
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


export const removeAllManageAction = () => ({
    type: ManageTypes.REMOVE_ALL_MANAGE,
})
