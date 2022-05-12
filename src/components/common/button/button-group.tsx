import React from 'react'

const ButtonGroup = () => {
    return (
        <>
            <div className="btn-group">
                <button
                    type="button"
                    className={`btn btn-success btn-sm`}
                    onClick={() => {
                        // addToThisMonth(item);
                    }}
                >
                    <i className="fas fa-plus-circle"></i>
                </button>
                <button
                    type="button"
                    className={`btn btn-secondary btn-sm`}
                    onClick={() => {
                        // showModalEdit(item)
                    }}
                >
                    <i className="fas fa-spinner"></i>
                </button>
                <button
                    type="button"
                    className={`btn btn-light btn-sm`}
                    onClick={() => {
                        // removeItem(item);
                    }}
                >
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </>
    )
}

export default ButtonGroup