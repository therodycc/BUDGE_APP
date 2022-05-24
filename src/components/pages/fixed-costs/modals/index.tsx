import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations";
import useForm from "../../../../hooks/useForm";
import { FixedCostsI, ModalFixedCostsPropsI } from "../../../../interfaces/fixed-costs/fixed-costs.interface";
import {
    addFixedCostAction,
    updateFixedCostsAction
} from "../../../../redux/actions/fixed-costs.action";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import { inputsDataFixedCosts } from "../../../../settings/fixed-costs/inputs-data";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

const ModalFixedCosts = ({ active, setToggle: toggle, data }: ModalFixedCostsPropsI) => {
    const [form, handleChange] = useForm()
    const dispatch = useDispatch();
    // errors
    const [errName, setErrName] = useState("");
    const [errExpense, setErrExpense] = useState("");


    const handleSubmit = (e: FormEvent) => {
        const errorName = isRequired(form.name, "Name is required", setErrName);
        const errorExpense = isRequired(form.expense, "Expense is required", setErrExpense);

        if (errorName || errorExpense) return;

        data?.uuid
            ? dispatch(updateFixedCostsAction(data.uuid, form))
            : dispatch(addFixedCostAction(form));

        toggle();
    };

    return (
        <>
            <Modal title="Fixed costs" active={active} setToggle={toggle}>
                <Form
                    inputsData={inputsDataFixedCosts({ form, errors: { errName, errExpense }, dropDowns: { statusOptions, urgencyOptions } })}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    footerSection={<>
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
                    </>}
                />

            </Modal>
        </>
    );
};

export default ModalFixedCosts;
