export const headersReports = () => [
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
]
