import React, { FC } from 'react'
interface ListTableCard {
    title: string
    description: string
    index: number
}

const ListTableCard: FC<ListTableCard> = ({ title, description, index }) => {
    return (
        <React.Fragment>
            <div className={`row p-3 ${index % 2 !== 0 && "bg-light"}`}>
                <div className="col-lg-6">
                    <h6 className="mb-0 text-sm">{title}</h6>
                </div>
                <div className="col-lg-6 d-flex justify-content-end">
                    <span className="text-xs">
                        {description}
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ListTableCard