import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { FixedCostsI } from "../../../../interfaces/fixed-costs/fixed-costs.interface";
import { addFixedCostAction } from "../../../../redux/actions/fixed-costs.action";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import Button from "../../../common/button";
import Dropdown from "../../../common/dropdown";
import InputText from "../../../common/input-text";
import Modal from "../../../common/modal";

interface ModalFixedCostsPropsI {
    active: boolean;
    toggle: Function;
}

const ModalFixedCosts = ({ active, toggle }: ModalFixedCostsPropsI) => {
    
    const dispatch = useDispatch()

    const [form, setForm] = useState<FixedCostsI>({
        name: "TEST ",
        category: "",
        expense: 0,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // dispatch(addFixedCostAction(form))
        console.log(form);
        // toggle()
    }
    return (
        <>
            <Modal
                title="Fixed costs"
                active={active}
                setToggle={toggle}>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <InputText
                                type={"text"}
                                name={"name"}
                                onChange={handleChange}
                                value={form?.name}
                                placeholder={"Your name"}
                                errors={['Name is required']}
                            />
                        </div>
                        <div className="col-lg-6">
                            <InputText
                                type={"number"}
                                name={"expense"}
                                value={form?.expense}
                                onChange={handleChange}
                                placeholder={"The amount here"}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <InputText
                                type={"number"}
                                name={"category"}
                                value={form?.category}
                                onChange={handleChange}
                                placeholder={"Your category"}
                            />
                        </div>
                        <div className="col-lg-6">
                            <InputText
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
                                name={"status"}
                                value={form?.status || ''}
                                onChange={handleChange}
                                options={statusOptions}
                            />
                        </div>

                        <div className="col-lg-6">
                            <Dropdown
                                name={"urgency"}
                                value={form?.urgency || ''}
                                onChange={handleChange}
                                options={urgencyOptions}
                            />
                        </div>

                        <div className="col-lg-12 mt-3">
                            <InputText
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

export default ModalFixedCosts;
