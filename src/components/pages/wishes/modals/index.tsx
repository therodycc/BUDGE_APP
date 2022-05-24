import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { isRequired } from "../../../../helpers/validations";
import useForm from "../../../../hooks/useForm";
import { WishesI } from "../../../../interfaces/wishes/wishes.interface";
import { addWishesAction, updateWishesAction } from "../../../../redux/actions/wishes.action";
import { statusOptions } from "../../../../settings/drops-downs-items/status.options";
import { urgencyOptions } from "../../../../settings/drops-downs-items/urgency.options";
import { inputsModalWishes } from "../../../../settings/wishes/inputs-data-modal";
import Button from "../../../common/button";
import Dropdown from "../../../common/dropdown";
import Form from "../../../common/form";
import Input from "../../../common/input";
import Modal from "../../../common/modal";

interface ModalWishesPropsI {
    active: boolean;
    toggle: Function;
    data: WishesI | null;
}

const ModalWishes = ({ active, toggle, data }: ModalWishesPropsI) => {
    const [form, handleChange] = useForm()
    const dispatch = useDispatch();

    // errors
    const [errName, setErrName] = useState("");
    const [errExpense, setErrExpense] = useState("");

    const handleSubmit = () => {
        const errorName = isRequired(form?.name, "Name is required", setErrName);
        const errorExpense = isRequired(form.expense, "Expense is required", setErrExpense);
        if (errorName || errorExpense) return

        data?.uuid
            ? dispatch(
                updateWishesAction(data.uuid, form)
            )
            : dispatch(addWishesAction(form));
        toggle();
        toggle();
    };

    return (
        <>
            <Modal title="Wishes" active={active} setToggle={toggle}>
                <Form inputsData={inputsModalWishes({
                    errors: { errName, errExpense },
                    form,
                    dropDowns: { statusOptions, urgencyOptions },
                })} handleSubmit={handleSubmit}
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

export default ModalWishes;
