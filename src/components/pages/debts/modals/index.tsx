import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations";
import useForm from "../../../../hooks/useForm";
import { DebtsI } from "../../../../interfaces/debts/debts.interface";
import { addDebtsAction, updateDebtsAction } from "../../../../redux/actions/debts.action";
import { inputsDataDebtsModal } from "../../../../settings/debts/inputs-data.settings";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

interface ModalDebtsPropsI {
    active: boolean;
    toggle: Function;
    data?: DebtsI | null
}

const ModalDebts = ({ active, toggle, data }: ModalDebtsPropsI) => {
    const [form, handleChange] = useForm()

    const dispatch = useDispatch()
    // errors
    const [errName, setErrName] = useState("");
    const [errExpense, setErrExpense] = useState("");

    const handleSubmit = (e: FormEvent) => {
        const errorName = isRequired(form?.name, "Name is required", setErrName);
        const errorExpense = isRequired(form?.expense, "Expense is required", setErrExpense);
        if (errorName || errorExpense) return
        data?.uuid
            ? dispatch(
                updateDebtsAction(data.uuid, form)
            )
            : dispatch(addDebtsAction(form));
        toggle();
    }
    return (
        <>
            <Modal
                title="Debts"
                active={active}
                setToggle={toggle}>
                <Form
                    inputsData={inputsDataDebtsModal({ form, errors: { errName, errExpense }, dropDowns: { statusOptions, urgencyOptions } })}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    footerSection={<>
                        <div className="col-lg-6">
                            <Button
                                action={() => {
                                    toggle()
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
                                action={() => {
                                }}
                                bgClass={"success"}
                                type={"submit"}
                                loading={false}
                                size="sm"
                            >
                                Add
                            </Button>
                        </div>
                    </>}
                />
            </Modal>
        </>
    );
};

export default ModalDebts;
