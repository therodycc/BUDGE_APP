import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { FixedCostsI } from "../../../../interfaces/fixed-costs/fixed-costs.interface";
import { addFixedCostAction } from "../../../../redux/actions/fixed-costs.action";
import Button from "../../../common/button";
import Dropdown from "../../../common/dropdown";
import InputText from "../../../common/input-text";
import Modal from "../../../common/modal";

interface ModalFixedCostsPropsI {
    active: boolean;
    toggle: Function;
}

const ModalFixedCosts = ({ active, toggle }: ModalFixedCostsPropsI) => {
    const elements = [
        {
            title: "",
            col: "",
        },
    ];

    const [form, setForm] = useState<FixedCostsI>({
        name: "TEST ",
        category: "",
        expense: 0,
    });


    const dispatch = useDispatch()

    const handleSubmit = (e: FormEvent) => {
        dispatch(addFixedCostAction(form))
        toggle()
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
                                placeholder={"Your name"}
                            />
                        </div>
                        <div className="col-lg-6">
                            <InputText
                                type={"number"}
                                name={"expense"}
                                placeholder={"The amount here"}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <InputText
                                type={"number"}
                                name={"category"}
                                placeholder={"Your category"}
                            />
                        </div>
                        <div className="col-lg-6">
                            <InputText
                                type={"number"}
                                name={"paidOut"}
                                placeholder={"Amount to pay"}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <Dropdown
                                name={"status"}
                                placeholder={"Your status"}
                                value={""}
                                onChange={() => { }}
                                options={[]}
                            />
                        </div>

                        <div className="col-lg-6">
                            <Dropdown
                                name={"urgency"}
                                placeholder={"Urgency"}
                                value={""}
                                onChange={() => { }}
                                options={[]}
                            />
                        </div>

                        <div className="col-lg-12 mt-3">
                            <InputText
                                type={"text"}
                                name={"image"}
                                placeholder={"The image goes here"}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <Button
                                action={() => {
                                    
                                }}
                                bgClass={"danger"}
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
