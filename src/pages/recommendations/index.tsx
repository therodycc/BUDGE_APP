import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from "../../components/common/button";
import Dropdown from "../../components/common/dropdown";
import InputText from "../../components/common/input";
import Layout from "../../components/layout";
import config from "../../config";
import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { OptionsDropdownI } from "../../interfaces/common/dropdown/dropdown.interface";
import httpProvider from "../../providers";

const Recommendations = () => {
    const [statusOptions, setStatusOptions] = useState<Array<OptionsDropdownI>>(
        []
    );
    const [categoryOptions, setCategoryOptions] = useState<
        Array<OptionsDropdownI>
    >([]);
    const [urgencyOptions, setUrgencyOptions] = useState<Array<OptionsDropdownI>>(
        []
    );
    const [form, setForm] = useState<any | null>(null);

    useEffect(() => {
        setStatusOptions([
            {
                title: "Pending",
                value: "Pending",
            },
            {
                title: "In progress",
                value: "In progress",
            },
            {
                title: "Completed",
                value: "Completed",
            },
        ]);
        setCategoryOptions([
            {
                title: "Fixed costs",
                value: "fixedCosts",
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
                title: "Leading",
                value: "leading",
            },
        ]);
        setUrgencyOptions([
            {
                title: "Immediate",
                value: "immediate",
            },
            {
                title: "Early",
                value: "early",
            },
            {
                title: "Whenever",
                value: "whenever",
            },
        ]);
    }, []);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        postItem(form);
    };

    const postItem = async (data: any) => {
        try {
            const result = await httpProvider.post(
                `${config.app.url}/${form.category || 'fixedCosts'}`,
                {
                    necessary: form?.necessary || 'Empty',
                    expense: +form?.expense || 0,
                    missingToComplete: 0,
                    urgency: form?.urgency || 'whenever',
                    paidOut: +form?.paidOut || 0,
                    category: form?.category || 'fixedCosts',
                    status: form?.status || 'Pending',
                    id: uuidv4(),
                    img: form?.img,
                    description: "",
                    links: []
                }
            );
            // console.log({ result });
            if (result?.ok) return sweetAlert.alert("Done!", "", "success");
        } catch (error) {
            sweetAlert.alert("Error!", "", "error");
            console.log({ error });
        }
    };

    return (
        <>
            <Layout>

                <div className="row mt-5">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header p-0 position-relative mt-n5 mx-3 z-index-2">
                                <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                                    <h4 className="mx-3 text-white">New</h4>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="pt-3 border-radius-xl bg-white">
                                        <div>
                                            <div className="pt-3 border-radius-xl bg-white">
                                                <div>
                                                    <div className="row mt-3">
                                                        <div className="col-lg-6">
                                                            <InputText
                                                                name="necessary"
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Necessary"
                                                            />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <InputText
                                                                name="expense"
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Expense"
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
                                                            <InputText
                                                                name="paidOut"
                                                                onChange={() => { }}
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
                                                            <InputText
                                                                name="img"
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Image link"
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
                                                    </div >
                                                </div >
                                            </div >
                                        </div >
                                    </div >
                                </form >
                            </div >
                        </div >
                    </div >
                    <div className="col-lg-8">
                        <div className="card card-body mx-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-6 text-center">
                                        <img className="w-100 border-radius-lg shadow-lg mx-auto" src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/products/product-details-1.jpg" alt="chair" />
                                    </div>
                                    <div className="col-lg-7">
                                        <h3 className="mt-lg-0">Minimal Bar Stool</h3>
                                        <p>$1,419</p>
                                        <div className="card">
                                            <div className="card-body p-3">
                                                <div className="row">
                                                    <div>
                                                        <div className="table-responsive">
                                                            <table className="table align-items-center mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="d-flex px-2 py-0">
                                                                                <span className="badge bg-gradient-warning me-3"> </span>
                                                                                <div className="d-flex flex-column justify-content-center">
                                                                                    <h6 className="mb-0 text-sm">Basement</h6>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="align-middle text-center text-sm">
                                                                            <span className="text-xs"> 20% </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Recommendations;
