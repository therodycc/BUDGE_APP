import React, { useState } from 'react';
import sweetAlert from '../../../helpers/sweetAlert.helper';
import { FormProfitsI } from '../../../interfaces/app/form-profits/form-profits.interface';
import httpProvider from '../../../providers';
import Button from '../../common/button/Index';
import Dropdown from '../../common/dropdown/Index';
import InputText from '../../common/input-text/Index';
import Modal from '../../common/modal/Index';
import { v4 as uuidv4 } from 'uuid';
import config from '../../../config';

const FormProfits = ({ setToggle, refreshData, dataToEdit }: FormProfitsI) => {

    const [form, setForm] = useState<any>({
        type: '',
        amount: 0,
        active: true
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (dataToEdit) return update()
        addNewProfits()

    };

    const addNewProfits = () => {
        const result = httpProvider.post(`${config.app.url}/profits`, {
            ...form,
            id: uuidv4(),
            amount: +form.amount
        })
            .then(res => {
                console.log({ res });
                refreshData()
                setToggle()
                return sweetAlert.toast('Done!', '', 'success')
            })
            .catch((error) => {
                return sweetAlert.toast('Error', '', 'error')
            })
        console.log({ result });
    }

    const update = () => {
        httpProvider.patch(`${config.app.url}/profits`, dataToEdit?.id, form)
            .then(res => {
                console.log({ res });
                refreshData()
                setToggle()
                return sweetAlert.toast('Updated!', '', 'success')
            })
            .catch((error) => {
                return sweetAlert.toast('Error', '', 'error')
            })
    }

    return <>
        <Modal

            setToggle={setToggle}
            head={
                <>

                </>
            }
            footer={
                <>

                </>
            }

        >
            <form onSubmit={handleSubmit} style={{ zIndex: 4 }}>
                <div className="pt-3 border-radius-xl bg-white">
                    <div>
                        <div className="row">
                            <div className="col-lg-6">
                                <InputText
                                    name="type"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Type"
                                    value={form?.type}
                                />
                            </div>
                            <div className="col-lg-6">
                                <InputText
                                    name="amount"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Amount"
                                    value={form?.amount}
                                />
                            </div>
                        </div>
                        <div className="button-row d-flex mt-4 justify-content-between">
                            <Button
                                type="submit"
                                bgClass="info"
                                size="sm"
                                action={() => { }}
                                loading={false}
                            >
                                Save
                            </Button>
                            <div className="form-check form-switch ms-2 my-auto is-filled">
                                <input
                                    onClick={() => {
                                        // disabledItem(item)
                                    }}
                                    className="form-check-input"
                                    onChange={() => {
                                        setForm({
                                            ...form,
                                            active: !form?.active
                                        })
                                    }}
                                    type="checkbox"
                                    id="flexSwitchCheckDefault23"
                                    checked={form?.active}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>

    </>;
};

export default FormProfits;
