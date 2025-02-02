import { RccNotifications } from "rcc-react-lib";
import { TypeTable } from "../../../interfaces/utility/utilily.type";
import manageProvider from "../../../providers/utilities/utilities.provider";
import { updateManage } from "./manage.slice";

interface IPayAction {
  type: TypeTable;
  uuid: string;
  paidOut: number;
}

export const payAction = ({ uuid, type, paidOut }: IPayAction) => {
  return async (dispatch: Function) => {
    if (!uuid) return console.log("no passed");

    const res = await manageProvider.updateAction(uuid, type, {
      paidOut,
      status: "COMPLETED",
    });
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");

    dispatch(
      updateManage({
        manage: {
          uuid,
          ...(paidOut && { paidOut: +paidOut }),
          status: "COMPLETED",
        },
      })
    );
  };
};
