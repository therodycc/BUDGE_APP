import { NextPage } from "next";
import React from "react";

const ReportExportedKey: NextPage = () => {
    return (
        <React.Fragment>
            <div className="container my-5">
                <div className="col-lg-12 bg-dark p-3 rounded">
                    <div className="card ">
                        <div className="card-header pb-0 p-3">
                            <h6 className="text-start">Device limit</h6>
                        </div>
                        <div className="card-body p-3 py-1 ">
                            <div className="row">
                                <div className="col-5 text-center">
                                    <h4 className="font-weight-bold">
                                        <span className="text-dark" id="value">
                                            21
                                        </span>
                                        <span className="text-body">°C</span>
                                    </h4>
                                </div>
                                <div className="col-7 my-auto">
                                    <div className="table-responsive">
                                        <table className="table align-items-center mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-0">
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">
                                                                    Current Temperature
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="text-xs"> 21°C </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-0">
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">Humidity</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="text-xs"> 57% </span>
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
        </React.Fragment>
    );
};

export default ReportExportedKey;
