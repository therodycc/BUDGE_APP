import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations";
import { DebtsI } from "../../../../interfaces/debts/debts.interface";
import { addDebtsAction, updateDebtsAction } from "../../../../redux/actions/debts.action";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import Button from "../../../common/button";
import Dropdown from "../../../common/dropdown";
import Input from "../../../common/input";
import Modal from "../../../common/modal";

interface ModalDebtsPropsI {
    active: boolean;
    toggle: Function;
    data?: DebtsI | null
}

const ModalDebts = ({ active, toggle, data }: ModalDebtsPropsI) => {

    const dispatch = useDispatch()

    const [form, setForm] = useState<DebtsI>({
        name: data?.name || "",
        expense: data?.expense || 0,
        paidOut: data?.paidOut || 0,
        urgency: data?.urgency || "WHENEVER",
        category: data?.category || "",
        status: data?.status || "PENDING",
        description: data?.description || "",
        to: data?.to || ""
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
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errorName = isRequired(form.name, "Name is required", setErrName);
        const errorExpense = isRequired(form.expense, "Expense is required", setErrExpense);
        if (errorName || errorExpense) {
            return;
        }
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
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <Input
                                title="Name"
                                type={"text"}
                                name={"name"}
                                onChange={handleChange}
                                value={form?.name}
                                placeholder={"Your name"}
                                errorMessage={errName}
                            />
                        </div>
                        <div className="col-lg-6">
                            <Input
                                title="Amount"
                                type={"number"}
                                name={"expense"}
                                value={form?.expense}
                                onChange={handleChange}
                                placeholder={"The amount here"}
                                errorMessage={errExpense}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <Input
                                title="Category"
                                type={"text"}
                                name={"category"}
                                value={form?.category}
                                onChange={handleChange}
                                placeholder={"Your category"}
                            />
                        </div>
                        <div className="col-lg-6">
                            <Input
                                title="Paid Out"
                                type={"number"}
                                name={"paidOut"}
                                value={form?.paidOut}
                                onChange={handleChange}
                                placeholder={"Amount to pay"}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <Dropdown
                                title="Status"
                                name={"status"}
                                value={form?.status || ''}
                                onChange={handleChange}
                                options={statusOptions}
                            />
                        </div>

                        <div className="col-lg-6">
                            <Dropdown
                                title="Urgency"
                                name={"urgency"}
                                value={form?.urgency || ''}
                                onChange={handleChange}
                                options={urgencyOptions}
                            />
                        </div>

                        <div className="col-lg-12 mt-3">
                            <Input
                                title="Description"
                                type={"text"}
                                name={"description"}
                                value={form?.description}
                                onChange={handleChange}
                                placeholder={"Write a description"}
                            />
                        </div>

                        <div className="col-lg-12 mt-3">
                            <Input
                                title="To whom"
                                type={"text"}
                                name={"to"}
                                value={form?.to}
                                onChange={handleChange}
                                placeholder={"E.g. To the neighbor"}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
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
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default ModalDebts;
