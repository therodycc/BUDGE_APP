const NoDataTable = () => {
    return (
        <>
            <tr>
                <td colSpan={12}
                    className="text-center p-5"
                >
                    <div className="p-5 d-flex flex-column align-items-center justify-content-center">
                        <span className="mb-5 text-muted text-lg font-weight-bold w-100">No data found</span>
                        <img
                            className="col-3"
                            src="/assets/images/no-data/empty.svg" alt="" />
                        {/* <FontAwesomeIcon className="icon" icon={faBook} /> */}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default NoDataTable