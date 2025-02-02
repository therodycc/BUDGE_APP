import { RccNotifications } from "rcc-react-lib";
import accountProvider from "../../../providers/accounts/accounts.provider";
import { accountActions } from "./accounts.slice";

export const getAllAccounts = () => {
  return async (dispatch: Function) => {
    const res = await accountProvider.getAll();
    if (res.error)
      return RccNotifications.toast("Error", res?.error?.message, "error");

    dispatch(
      accountActions.setAccount({
        accounts: res.data.map((item: any, index: number) => ({
          ...item,
          active: index === 0,
        })),
      })
    );
  };
};
