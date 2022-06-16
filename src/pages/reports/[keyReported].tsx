import { NextPage } from "next";
import React from "react";
import { currencyFormat } from '../../helpers/currency.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const ReportExportedKey: NextPage = () => {
    const router = useRouter()

    const fixedExported = [
        {
            name: "House",
            description: currencyFormat(200),
        },
        {
            name: "House",
            description: currencyFormat(200),
        },
        {
            name: "House",
            description: currencyFormat(200),
        },
        {
            name: "House",
            description: currencyFormat(200),
        },
        {
            name: "House",
            description: currencyFormat(200),
        },
        {
            name: "House",
            description: currencyFormat(200),
        },
        {
            name: "House",
            description: currencyFormat(200),
        },
        {
            name: "House",
            description: currencyFormat(200),
        },
        {
            name: "House",
            description: currencyFormat(200),
        },
    ];
    return (
        <React.Fragment>
            <div className="container my-5">
                <div className="col-lg-12 p-3 rounded">
                    <div className="card ">
                        <div className="d-flex align-items-center rounded-pill shadow-lg bg-dark text-white m-3 p-3">
                            <FontAwesomeIcon
                                onClick={() => router.back()}
                                className="bg-white rounded-circle p-3 text-dark cursor-pointer me-3"
                                style={{
                                    fontSize: "15px"
                                }}
                                icon={faArrowLeft} />
                            <h6 className="text-white mt-2">
                                12 - 12 - 2001
                            </h6>
                        </div>
                        <div className="card-body p-3 py-1 ">
                            <div className="row mt-2">
                                <div className="col-lg-5 px-5 pt-2">
                                    <h5 className="font-weight-bold d-flex justify-content-between card p-2 rounded shadow">
                                        <span className="text-dark">Total</span>
                                        <span className="text-body">{currencyFormat(0)}</span>
                                    </h5>
                                    <h5 className="font-weight-bold d-flex justify-content-between">
                                        <span className="text-dark">Pending</span>
                                        <span className="text-body">{currencyFormat(0)}</span>
                                    </h5>
                                    <h5 className="font-weight-bold d-flex justify-content-between">
                                        <span className="text-dark">Remaining</span>
                                        <span className="text-body">{currencyFormat(0)}</span>
                                    </h5>
                                </div>
                                <div className="col-lg-7">
                                    <div className="table-responsive mx-3">
                                        <table className="table align-items-center mb-0">
                                            <tbody>
                                                {fixedExported.map((item, index) => (
                                                    <tr
                                                        key={item.name + index}
                                                        className="">
                                                        <td>
                                                            <div className="d-flex px-2 py-0">
                                                                <div className="d-flex flex-column justify-content-center">
                                                                    <h6 className="mb-0 text-sm">{item?.name}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle text-end text-sm">
                                                            <span className="text-xs">
                                                                {item?.description}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};


export default ReportExportedKey;
