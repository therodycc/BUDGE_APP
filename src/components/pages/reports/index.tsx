import React, { useState } from 'react'
import Box from '../../common/box';
import Table from '../../common/table';

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
            <Box title="Reports">
                <Table headItems={headItems} bodyItems={data} />
            </Box>
        </>
    );
}

export default Reports