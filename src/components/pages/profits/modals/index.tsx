import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isRequired } from '../../../../helpers/validations';
import { ProfitsI } from '../../../../interfaces/profits/profits.interface';
import { addProfitsAction, updateProfitsAction } from '../../../../redux/actions/profits.action';
import Button from '../../../common/button';
import Input from '../../../common/input';
import Modal from '../../../common/modal';

interface ModalProfitsPropsI {
    active: boolean;
    toggle: Function;
    data?: any;
}

const ModalProfits = ({ active, toggle, data }: ModalProfitsPropsI) => {

    const dispatch = useDispatch();

    const [form, setForm] = useState<ProfitsI>({
        type: data?.type || "",
        amount: data?.amount || 0,
        active: data?.active || true,
    });

    // errors
    const [errName, setErrName] = useState("");
    const [errAmount, setErrAmount] = useState("");

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errorName = isRequired(form.type, "Name is required", setErrName);
        const errorExpense = isRequired(form.amount, "Expense is required", setErrAmount);
        if (errorName || errorExpense) {
            return;
        }
        data?.uuid
            ? dispatch(
                updateProfitsAction(data.uuid, form)
            )
            : dispatch(addProfitsAction(form));
        toggle();
    };

    return (
        <>
            <Modal title="Profits" active={active} setToggle={toggle}>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <Input
                                title="Type"
                                type={"text"}
                                name={"type"}
                                onChange={handleChange}
                                value={form?.type}
                                placeholder={"Type"}
                                errorMessage={errName}
                            />
                        </div>
                        <div className="col-lg-6">
                            <Input
                                title="Amount"
                                type={"number"}
                                name={"amount"}
                                value={form?.amount}
                                onChange={handleChange}
                                placeholder={"The amount here"}
                                errorMessage={errAmount}
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
    )
}

export default ModalProfits