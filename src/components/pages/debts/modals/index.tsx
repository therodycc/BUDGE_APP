import { useDispatch } from "react-redux";
import sweetAlert from "../../../../helpers/alerts/sweetAlert.helper";
import { DebtsI, ModalDebtsPropsI } from "../../../../interfaces/debts/debts.interface";
import debtProvider from "../../../../providers/debt/debt.provider";
import { addNewDebt } from "../../../../redux-toolkit/slices/debts.slice";
import { inputsDataDebtsModal } from "../../../../settings/debts/inputs-data.settings";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal/Index";

const ModalDebts = ({ active, setToggle: toggle, data }: ModalDebtsPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        data?.uuid
            ? updateDebt(data.uuid, {
                ...form,
                ...(form.expense && { expense: +data.expense }),
            })
            : createNewDebt(form);
        toggle();
    };

    const createNewDebt = async (data: DebtsI) => {
        const result = await debtProvider.create(data)
        dispatch(addNewDebt({ debt: result.data.response }))
    }

    const updateDebt = async (uuid: string, data: DebtsI) => {
        const res = await debtProvider.update(uuid, data)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Updated!", "success");
    }

    return (
        <>
            <Modal title="Debts" active={active} setToggle={toggle}>
                <Form
                    keyForm="debts"
                    inputsData={inputsDataDebtsModal}
                    handleSubmit={handleSubmit}
                    initialState={data || {
                        expense: 0,
                        name: "",
                        status: "PENDING",
                        urgency: "WHENEVER",
                        description: "",
                        category: "",
                        to: ""
                    }}
                    footerSection={
                        <>
                            <div className="col-lg-6">
                                <Button
                                    action={() => {
                                        toggle();
                                    }}
                                    bgClass={"secondary"}
                                    type={"button"}
                                    loading={false}
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </div>
                            <div className="col-lg-6">
                                <Button
                                    action={() => { }}
                                    bgClass={"success"}
                                    type={"submit"}
                                    loading={false}
                                    size="sm"
                                >
                                    Add
                                </Button>
                            </div>
                        </>
                    }
                />
            </Modal>
        </>
    );
};

export default ModalDebts;
