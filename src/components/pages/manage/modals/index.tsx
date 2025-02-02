import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ManageI } from "../../../../interfaces/manage/manage.interface";
import manageProvider from "../../../../providers/utilities/utilities.provider";
import { updateManage } from "../../../../redux-toolkit/slices/manage/manage.slice";
import { inputsModalManage } from "../../../../settings/manage/inputs-modal";
import { RccButton, RccForm, RccModal, RccNotifications } from "rcc-react-lib";
interface ModalManagePropsI {
  active: boolean;
  toggle: Function;
  data: ManageI;
}

const ModalManage = ({ active, toggle, data }: ModalManagePropsI) => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (form: any) => {
      const { type, ...restForm } = form;

      const res = await manageProvider.updateAction(data?.uuid!, data.type, {
        ...restForm,
        paidOut: data!.paidOut! + +form.paidOut,
      });
      if (res.error)
        return RccNotifications.alert("Error", res?.error?.message, "error");
      RccNotifications.alert("Success", "Updated!", "success");

      dispatch(
        updateManage({
          manage: {
            ...form,
            ...(form.expense && { expense: +form.expense }),
            ...(form.paidOut && { paidOut: data!.paidOut! + +form.paidOut }),
          },
        })
      );
      toggle();
    },
    [data, dispatch, toggle]
  );

  return (
    <React.Fragment>
      <RccModal title="Manage" active={active} setToggle={toggle}>
        <RccForm
          inputsData={inputsModalManage}
          handleSubmit={handleSubmit}
          initialState={data || {}}
          footerSection={
            <div className="row mt-3">
              <div className="col-lg-6">
                <RccButton
                  action={() => {
                    toggle();
                  }}
                  bgClass={"secondary"}
                  type={"button"}
                  loading={false}
                  size="sm"
                >
                  Cancel
                </RccButton>
              </div>
              <div className="col-lg-6">
                <RccButton
                  bgClass={"success"}
                  type={"submit"}
                  loading={false}
                  size="sm"
                >
                  Add
                </RccButton>
              </div>
            </div>
          }
        />
      </RccModal>
    </React.Fragment>
  );
};

export default ModalManage;
