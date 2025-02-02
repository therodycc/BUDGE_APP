import { RccButton, RccForm, RccModal, RccNotifications } from "rcc-react-lib";
import { useDispatch } from "react-redux";
import {
  DebtsI,
  ModalDebtsPropsI,
} from "../../../../interfaces/debts/debts.interface";
import debtProvider from "../../../../providers/debt/debt.provider";
import {
  addNewDebt,
  updateDebt,
} from "../../../../redux-toolkit/slices/debts.slice";
import { inputsDataDebtsModal } from "../../../../settings/debts/inputs-data.settings";

const ModalDebts = ({ active, setToggle: toggle, data }: ModalDebtsPropsI) => {
  const dispatch = useDispatch();

  const handleSubmit = (form: any) => {
    data?.uuid
      ? updateDebtData(data.uuid, {
          ...form,
          ...(form.expense && { expense: +form.expense }),
        })
      : createNewDebt(form);
    toggle();
  };

  const createNewDebt = async (form: DebtsI) => {
    const result = await debtProvider.create(form);
    dispatch(addNewDebt({ debt: result.data.response }));
  };

  const updateDebtData = async (uuid: string, form: DebtsI) => {
    const res = await debtProvider.update(uuid, {
      ...form,
      ...(form.expense && { expense: +form.expense }),
      ...(form.paidOut && { paidOut: +form.paidOut }),
    });
    if (res.error)
      return RccNotifications.alert("Error", res?.error?.message, "error");
    RccNotifications.alert("Success", "Updated!", "success");
    dispatch(
      updateDebt({
        debt: {
          ...form,
          ...(form.expense && { expense: +form.expense }),
          ...(form.paidOut && { paidOut: +form.paidOut }),
        },
      })
    );
  };

  return (
    <>
      <RccModal title="Debts" active={active} setToggle={toggle}>
        <RccForm
          keyForm="debts"
          inputsData={inputsDataDebtsModal}
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

export default ModalDebts;
