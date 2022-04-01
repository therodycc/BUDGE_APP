import React, { useEffect, useState } from 'react'
import config from '../../../config'
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper'
import { FormBudgetI } from '../../../interfaces/app/form-budget/form-budget.interface'
import { OptionsDropdownI } from '../../../interfaces/common/dropdown/dropdown.interface'
import { UtilityI } from '../../../interfaces/utility/utility.interface'
import httpProvider from '../../../providers'
import Button from '../../common/button'
import Dropdown from '../../common/dropdown'
import Input from '../../common/input'
import Modal from '../../common/modal'
import Router from 'next/router'

const FormBudget = ({ setToggle, data, refreshData, urlTo }: FormBudgetI) => {

    const [statusOptions, setStatusOptions] = useState<Array<OptionsDropdownI>>(
        []
    );
    const [categoryOptions, setCategoryOptions] = useState<
        Array<OptionsDropdownI>
    >([]);
    const [urgencyOptions, setUrgencyOptions] = useState<Array<OptionsDropdownI>>(
        []
    );
    const [form, setForm] = useState<any | UtilityI>({
        uuid: data.uuid,
        name: data.name,
        expense: data.expense,
        paidOut: data.paidOut,
        img: data.img,
        urgency: data.urgency,
        category: data.category,
        status: data.status,
        active: data.active
    });


    useEffect(() => {
        setStatusOptions([
            {
                title: "Pending",
                value: "PENDING",
            },
            {
                title: "In progress",
                value: "IN_PROGRESS",
            },
            {
                title: "Completed",
                value: "COMPLETED",
            },
        ]);
        setCategoryOptions([
            {
                title: "Fixed costs",
                value: "FIXED_COSTS",
            },
            {
                title: "Voluntary",
                value: "voluntary",
            },
            {
                title: "Debt",
                value: "debt",
            },
            {
                title: "Wishes",
                value: "wishes",
            },
            {
                title: "Necessary",
                value: "necessary",
            },
            {
                title: "Lending",
                value: "lending",
            },
        ]);
        setUrgencyOptions([
            {
                title: "Immediate",
                value: "IMMEDIATE",
            },
            {
                title: "Early",
                value: "EARLY",
            },
            {
                title: "Whenever",
                value: "WHENEVER",
            },
        ]);
    }, []);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();


        if (data.category !== form.category) {
            return httpProvider.post(`${config.app.url}/${Router.pathname as string}`, {
                ...form,
                expense: +form.expense
            })
                .then(res => {
                    setToggle()
                    sweetAlert.alert('Done!', `Moved to ${urlTo}!`, 'success')
                    httpProvider.delete(`${config.app.url}/${data}`, data.id)
                        .then(res => {
                            refreshData()
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => error)
        }


        httpProvider.patch(`${config.app.url}/${urlTo}`, form.uuid, {
            ...form,
            expense: +form.expense
        })
            .then(res => {
                setToggle()
                refreshData()
                console.log(res);
                sweetAlert.alert('Done!', 'updated successfully!', 'success')
            })
            .catch(error => console.log(error))
    };

    return (
        <>
            <Modal

                setToggle={setToggle}
                footer={
                    <>

                    </>
                }

            >
                <form onSubmit={handleSubmit} style={{ zIndex: 4 }}>
                    <div className="pt-3 border-radius-xl bg-white">
                        <div>
                            <div className="row mt-3">
                                <div className="col-lg-6">
                                    <Input
                                        name="name"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Necessary"
                                        value={form?.name}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <Input
                                        name="expense"
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Expense"
                                        value={form?.expense}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-6">
                                    <Dropdown
                                        name="urgency"
                                        value={form?.urgency}
                                        onChange={handleChange}
                                        options={urgencyOptions}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <Input
                                        name="paidOut"
                                        onChange={handleChange}
                                        value={form?.paidOut}
                                        type="number"
                                        placeholder="paidOut"
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-6">
                                    <Dropdown
                                        name="category"
                                        value={form?.category}
                                        options={categoryOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <Dropdown
                                        name="status"
                                        value={form?.status}
                                        onChange={handleChange}
                                        options={statusOptions}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <Input
                                        name="img"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Image link"
                                        value={form?.img}
                                    />
                                </div>
                            </div>
                            <div className="button-row d-flex mt-4 justify-content-between ">
                                <Button
                                    type="submit"
                                    bgClass="info"
                                    size="sm"
                                    action={() => { }}
                                    loading={false}
                                >
                                    Save
                                </Button>
                                <Button
                                    type="button"
                                    bgClass="danger"
                                    size="sm"
                                    action={() => { }}
                                    loading={false}
                                >
                                    reset
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default FormBudget
