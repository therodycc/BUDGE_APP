import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations";
import useForm from "../../../../hooks/useForm";
import { NecessaryI } from "../../../../interfaces/necessary/necessary.interface";
import {
    addNecessaryAction,
    updateNecessaryAction
} from "../../../../redux/actions/necessary.action";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import { inputsModalNecessary } from "../../../../settings/necessary/inputs-data-modals";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

interface ModalNecessaryPropsI {
    active: boolean;
    toggle: Function;
    data?: NecessaryI | null;
}

const ModalNecessary = ({ active, toggle, data }: ModalNecessaryPropsI) => {
    const [form, handleChange] = useForm()
    const dispatch = useDispatch();

    // errors
    const [errName, setErrName] = useState("");
    const [errExpense, setErrExpense] = useState("");

    const handleSubmit = () => {
        const errorName = isRequired(form.name, "Name is required", setErrName);
        const errorExpense = isRequired(form.expense, "Expense is required", setErrExpense);
        if (errorName || errorExpense) return;

        data?.uuid
            ? dispatch(updateNecessaryAction(data.uuid, form))
            : dispatch(addNecessaryAction(form));
        toggle();
    };
    return (
        <>
            <Modal title="Necessary" active={active} setToggle={toggle}>
                <Form
                    inputsData={inputsModalNecessary({
                        errors: { errName, errExpense },
                        form,
                        dropDowns: { statusOptions, urgencyOptions },
                    })}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    footerSection={<>
                        <div className="col-lg-6">
                            <Button
                                action={() => toggle()}
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
                    </>}
                />
            </Modal>
        </>
    );
};

export default ModalNecessary;
