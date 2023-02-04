import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { TypeTable } from "../../interfaces/utility/utilily.type";
import manageProvider from "../../providers/utilities/utilities.provider";
import { updateManage } from "../slices/manage.slice";


interface IPayAction {
    type: TypeTable;
    uuid: string
    paidOut: number
    actions?: Function
}

//TODO se necesita implentar que se pueda usar el dispatch desde aqui

export const PayAction = ({ uuid, type, paidOut, actions }: IPayAction) => {
    return async (dispatch) => {
        if (!uuid) return console.log("no passed");

        const res = await manageProvider.updateAction(uuid, type, { paidOut, status: 'COMPLETED' })
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");

        dispatch(updateManage({
            manage: {
                ...(paidOut && { paidOut: +paidOut }),
                status: 'COMPLETED'
            }
        }))

        sweetAlert.alert("Success", "Updated!", "success");
        actions?.()
    }
}