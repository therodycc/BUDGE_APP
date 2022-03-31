import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import utilitiesProvider from "../../providers/utilities/utilities.provider";
import { UtilitiesTypes } from "../types/utilities.type";

export const getUtilitiesAction = () => {
    return (dispatch: Function) => {
        utilitiesProvider.getAll()
            .then(res => {
                dispatch({
                    type: UtilitiesTypes.GET_ALL,
                    payload: res?.data
                })
            })
            .catch(err => err)
    }
}

export const removeItemAction = (id: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        utilitiesProvider
            .remove(id)
            .then((data) => {
                dispatch({
                    type: UtilitiesTypes.REMOVE_ITEM,
                    payload: getStore().utilities.utilities.filter((item: any) => item.id !== id)
                })
            })
            .catch((error) => error);
    }
}

export const addToThisMonth = (item: any) => {
    return async (dispatch: Function) => {
        // fixedCostsProvider
        //     .update(item.id, {
        //         status: "In progress",
        //     })
        //     .then((data) => {
        //         console.log({ data });
        //     })
        //     .catch((error) => error);
        utilitiesProvider
            .postItem(item)
            .then((data) => {
                console.log(data, "post");
                sweetAlert
                    .alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    }
}