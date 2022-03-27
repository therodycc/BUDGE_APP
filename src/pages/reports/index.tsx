import { useState } from "react";
import Box from "../../components/common/box/Index";
import Table from "../../components/common/table/Index";
import Layout from "../../components/layout";
import { currencyFormat } from "../../helpers/currency.helper";

const Reports = () => {
    const [headItems, setHeadItems] = useState([
        {
            title: "Date",
            key: "date",
        },
        {
            title: "Amount",
            key: "amount",
        },
        {
            title: "Actions",
            render: ({ item }: any) => {
                return (
                    <>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className={`btn btn-${item.status === "In progress" ? "warning" : "light"
                                    } btn-sm`}
                            >
                                {" "}
                                <i className="fas fa-spinner"></i>
                            </button>
                            <button type="button" className={`btn btn-${"danger"} btn-sm`}>
                                pdf
                            </button>
                        </div>
                    </>
                );
            },
        },
    ]);
    const data = [
        {
            date: "adfasdfadfasdf",
            amount: 2000,
            dateToRequest: new Date().toLocaleString()
        },
    ];

    return (
        <>
            <Layout>
                <Box title="Reports">
                    <Table headItems={headItems} bodyItems={data} />
                </Box>
            </Layout>

        </>
    );
};

export default Reports;
