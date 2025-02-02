import { useDispatch } from "react-redux";

import { ModalNecessaryPropsI } from "../../../../interfaces/necessary/necessary.interface";
import necessaryProvider from "../../../../providers/necessary/necessary.provider";
import {
  addNewNecessary,
  updateNecessary,
} from "../../../../redux-toolkit/slices/necessary.slice";
import { inputsModalNecessary } from "../../../../settings/necessary/inputs-data-modals";
import { RccButton, RccForm, RccModal, RccNotifications } from "rcc-react-lib";

const ModalNecessary = ({
  active,
  setToggle: toggle,
  data,
}: ModalNecessaryPropsI) => {
  const dispatch = useDispatch();

  const handleSubmit = (form: any) => {
    data?.uuid
      ? updateNecessaryData(data.uuid, form)
      : addNewNecessaryData(form);
    toggle();
  };

  const updateNecessaryData = async (uuid: string, form: any) => {
    const res = await necessaryProvider.update(uuid, {
      ...form,
      expense: +form.expense,
      paidOut: +form.paidOut,
    });

    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Updated!", "success");
    dispatch(updateNecessary({ necessary: form }));
  };

  const addNewNecessaryData = async (form: any) => {
    const res = await necessaryProvider.create(form);
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Done!", "success");
    dispatch(addNewNecessary({ necessary: res?.data?.response }));
  };

  return (
    <>
      <RccModal title="Necessary" active={active} setToggle={toggle}>
        <RccForm
          keyForm="necessary"
          inputsData={inputsModalNecessary}
          handleSubmit={handleSubmit}
          initialState={
            data || {
              expense: 0,
              name: "",
              status: "PENDING",
              urgency: "WHENEVER",
              description: "",
              category: "",
              to: "",
            }
          }
          footerSection={
            <>
              <div className="col-lg-6">
                <RccButton
                  action={() => toggle()}
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
                  action={() => {}}
                  bgClass={"success"}
                  type={"submit"}
                  loading={false}
                  size="sm"
                >
                  Add
                </RccButton>
              </div>
            </>
          }
        />
      </RccModal>
    </>
  );
};

export default ModalNecessary;
