import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations";
import useForm from "../../../../hooks/useForm";
import { ManageI } from "../../../../interfaces/manage/manage.interface";
import { updateManageAction } from "../../../../redux/actions/manage.action";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import Button from "../../../common/button";
import Dropdown from "../../../common/dropdown";
import Input from "../../../common/input";
import Modal from "../../../common/modal";

interface ModalManagePropsI {
    active: boolean;
    toggle: Function;
    data: ManageI;
}

const ModalManage = ({ active, toggle, data }: ModalManagePropsI) => {
    const [form, handleChange] = useForm()
    const dispatch = useDispatch();
    // errors
    const [errName, setErrName] = useState("");
    const [errExpense, setErrExpense] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errorName = isRequired(form?.name, "Name is required", setErrName);
        const errorExpense = isRequired(form.expense, "Expense is required", setErrExpense);
        if (errorName || errorExpense) return;

        if (data.uuid) dispatch(updateManageAction(data.uuid, form))

        toggle();
    };

    return (
        <>
            <Modal title="Manage" active={active} setToggle={toggle}>
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
                                value={form?.status || ""}
                                onChange={handleChange}
                                options={statusOptions}
                            />
                        </div>

                        <div className="col-lg-6">
                            <Dropdown
                                title="Urgency"
                                name={"urgency"}
                                value={form?.urgency || ""}
                                onChange={handleChange}
                                options={urgencyOptions}
                            />
                        </div>

                        <div className="col-lg-12 mt-3">
                            <Input
                                title="Image"
                                type={"text"}
                                name={"image"}
                                value={form?.image}
                                onChange={handleChange}
                                placeholder={"The image goes here"}
                            />
                        </div>
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

export default ModalManage;
