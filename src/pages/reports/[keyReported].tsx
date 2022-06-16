import { NextPage } from "next";
import React from "react";
import { currencyFormat } from '../../helpers/currency.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import CardAmountText from "../../components/common/card/card-amount-text";
import ListTableCard from "../../components/common/list/list-table-card";

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
                        <div className="d-flex align-items-center rounded-pill shadow-lg text-white m-3 p-3">
                            <FontAwesomeIcon
                                onClick={() => router.back()}
                                className="bg-light rounded-circle p-3 text-dark cursor-pointer me-3"
                                style={{
                                    fontSize: "15px"
                                }}
                                icon={faArrowLeft} />
                            <h6 className="mt-2">
                                12 - 12 - 2001
                            </h6>
                        </div>
                        <div className=" p-3 py-1 ">
                            <div className="row mt-2">
                                <div className="col-lg-5 px-5 pt-2">
                                    <CardAmountText title={"Total"} description={currencyFormat(0)} />
                                    <CardAmountText title={"Pending"} description={currencyFormat(0)} />
                                    <CardAmountText title={"Remaining"} description={currencyFormat(0)} />
                                </div>
                                <div className="col-lg-7">
                                    <div className="row mx-3">
                                        {fixedExported?.map((item, index) => (
                                            <React.Fragment key={item.name + index}>
                                                <ListTableCard title={item?.name} description={item.description} index={index} />
                                            </React.Fragment>
                                        ))}
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
