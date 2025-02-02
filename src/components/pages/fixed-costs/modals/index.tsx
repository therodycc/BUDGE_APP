import { RccButton, RccForm, RccModal, RccNotifications } from "rcc-react-lib";
import { useDispatch } from "react-redux";

import { ModalFixedCostsPropsI } from "../../../../interfaces/fixed-costs/fixed-costs.interface";
import fixedCostsProvider from "../../../../providers/fixed-costs/fixed-costs.provider";
import {
  addNewFixedCost,
  updateFixedCost,
} from "../../../../redux-toolkit/slices/fixed-costs.slice";
import { inputsDataFixedCosts } from "../../../../settings/fixed-costs/inputs-data";

const ModalFixedCosts = ({
  active,
  setToggle: toggle,
  data: globalData,
}: ModalFixedCostsPropsI) => {
  const dispatch = useDispatch();

  const handleSubmit = (form: any) => {
    globalData?.uuid
      ? updateFixedCostData(globalData.uuid, form)
      : addNewFixedCostData(form);
    toggle();
  };

  const updateFixedCostData = async (uuid: string, form: any) => {
    const res = await fixedCostsProvider.update(uuid, form);
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Updated!", "success");
    dispatch(
      updateFixedCost({
        fixedCost: {
          ...form,
          ...(form.expense && { expense: +form.expense }),
          ...(form.paidOut && { paidOut: +form.paidOut }),
        },
      })
    );
  };

  const addNewFixedCostData = async (form: any) => {
    const res = await fixedCostsProvider.create(form);
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Done!", "success");
    dispatch(addNewFixedCost({ fixedCost: res?.data?.response }));
  };

  return (
    <>
      <RccModal title="Fixed costs" active={active} setToggle={toggle}>
        <RccForm
          keyForm="fixed-costs"
          inputsData={inputsDataFixedCosts}
          handleSubmit={handleSubmit}
          initialState={
            globalData || {
              expense: 0,
              name: "",
              status: "PENDING",
              urgency: "WHENEVER",
              description: "",
              category: "",
            }
          }
          footerSection={
            <>
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

export default ModalFixedCosts;
