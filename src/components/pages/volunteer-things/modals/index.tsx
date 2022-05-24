import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations";
import { VolunteerThingsI } from "../../../../interfaces/volunteer-things/volunteer-things.interface";
import {
    addVolunteerThingsAction,
    updateVolunteerThingsAction,
} from "../../../../redux/actions/volunteer-things.action";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import { inputsModalVolunteerThings } from "../../../../settings/volunteer-things/inputs-modal";
import Button from "../../../common/button";
import Dropdown from "../../../common/dropdown";
import Form from "../../../common/form";
import Input from "../../../common/input";
import Modal from "../../../common/modal";

interface ModalVolunteerThingsPropsI {
    active: boolean;
    toggle: Function;
    data: VolunteerThingsI | null;
}

const ModalVolunteerThings = ({
    active,
    toggle,
    data,
}: ModalVolunteerThingsPropsI) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState<VolunteerThingsI>({
        name: data?.name || "",
        expense: data?.expense || 0,
        paidOut: data?.paidOut || 0,
        image: data?.image || "",
        urgency: data?.urgency || "WHENEVER",
        category: data?.category || "",
        status: data?.status || "PENDING",
        to: data?.to || "",
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

    const handleSubmit = () => {
        const errorName = isRequired(form?.name, "Name is required", setErrName);
        const errorExpense = isRequired(
            form.expense,
            "Expense is required",
            setErrExpense
        );
        if (errorName || errorExpense) return;

        data?.uuid
            ? dispatch(updateVolunteerThingsAction(data.uuid, form))
            : dispatch(addVolunteerThingsAction(form));
        toggle();
        toggle();
    };

    return (
        <>
            <Modal title="Volunteer Things" active={active} setToggle={toggle}>
                <Form
                    inputsData={inputsModalVolunteerThings({
                        errors: { errName, errExpense },
                        form,
                        dropDowns: { statusOptions, urgencyOptions },
                    })}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
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

export default ModalVolunteerThings;
