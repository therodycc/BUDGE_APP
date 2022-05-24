import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isRequired } from '../../../../helpers/validations';
import useForm from '../../../../hooks/useForm';
import { ProfitsI } from '../../../../interfaces/profits/profits.interface';
import { addProfitsAction, updateProfitsAction } from '../../../../redux/actions/profits.action';
import { inputsDataProfitsModal } from '../../../../settings/profits/inputs-data';
import Button from '../../../common/button';
import Form from '../../../common/form';
import Modal from '../../../common/modal';

interface ModalProfitsPropsI {
    active: boolean;
    toggle: Function;
    data?: any;
}

const ModalProfits = ({ active, toggle, data }: ModalProfitsPropsI) => {
    const [form, handleChange] = useForm()
    const dispatch = useDispatch();
    // errors
    const [errName, setErrName] = useState("");
    const [errAmount, setErrAmount] = useState("");

    const handleSubmit = () => {
        const errorName = isRequired(form.type, "Name is required", setErrName);
        const errorExpense = isRequired(form.amount, "Expense is required", setErrAmount);
        if (errorName || errorExpense) {
            return;
        }
        data?.uuid
            ? dispatch(updateProfitsAction(data.uuid, form))
            : dispatch(addProfitsAction(form));
        toggle();
    };

    return (
        <>
            <Modal title="Profits" active={active} setToggle={toggle}>
                <Form inputsData={inputsDataProfitsModal({
                    form,
                    errors: { errName, errAmount },
                })}
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
    )
}

export default ModalProfits