import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations";
import { FixedCostsI, ModalFixedCostsPropsI } from "../../../../interfaces/fixed-costs/fixed-costs.interface";
import {
    addFixedCostAction,
    updateFixedCostsAction,
} from "../../../../redux/actions/fixed-costs.action";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import { inputsDataFixedCosts } from "../../../../settings/fixed-costs/inputs-data";
import Button from "../../../common/button";
import Dropdown from "../../../common/dropdown";
import Input from "../../../common/input";
import Modal from "../../../common/modal";

const ModalFixedCosts = ({ active, setToggle: toggle, data }: ModalFixedCostsPropsI) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState<FixedCostsI>({
        name: data?.name || "",
        expense: Number(data?.expense) || 0,
        paidOut: data?.paidOut || 0,
        image: data?.image || "",
        urgency: data?.urgency || "WHENEVER",
        category: data?.category || "",
        status: data?.status || "PENDING",
        active: data?.active || true,
    });

    // errors
    const [errName, setErrName] = useState("");
    const [errExpense, setErrExpense] = useState("");

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
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
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {inputsDataFixedCosts({
                            form,
                            errors: { errName, errExpense },
                            dropDowns: { statusOptions, urgencyOptions },
                        }).map((item) => (
                            <div className={`mt-3 ${item.cols}`}>
                                {item.props.type === "dropdown" && item.options ? (
                                    <Dropdown
                                        title={item.props.title}
                                        value={item.props.value?.toString()}
                                        name={item.props.name}
                                        options={item.options}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Input {...item.props} {...item} onChange={handleChange} />
                                )}
                            </div>
                        ))}

                        <div className="col-lg-12 mt-3"></div>
                    </div>
                    <div className="row mt-3">
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
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default ModalFixedCosts;
