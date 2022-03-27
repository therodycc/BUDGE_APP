import React from 'react'
import { TablePropsI } from '../../../interfaces/common/table/table.interface'

const Table = ({ headItems, bodyItems }: TablePropsI) => {
    return (
        <>
            <table className="table align-items-center mb-0">
                <thead>
                    <tr>
                        {
                            headItems && headItems?.map((head, index) => (
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" key={head?.title + index}>{head?.title}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {bodyItems && bodyItems?.map((item:any, index:number) => (
                        <tr key={index} >
                            {
                                headItems.map((head, index) => (
                                    <td key={index} className='p-3' >
                                        {typeof head?.render === "function" && !head?.key && (<head.render item={item} index={index} />)}
                                        {head?.key && (
                                            <p className="text-sm font-weight-normal mb-0">{item[head?.key]}</p>
                                        )}

                                    </td>
                                ))
                            }
                        </tr>
                    ))
                    }

                </tbody>
            </table>
        </>
    )
}

export default Table



// <td className="align-middle text-center text-sm">
// <p className="text-sm font-weight-normal mb-0">$9.500</p>
// </td>
// <td className="align-middle text-end">
// <div className="d-flex px-3 py-1 justify-content-center align-items-center">
//     <p className="text-sm font-weight-normal mb-0">13</p>
//     <i className="ni ni-bold-down text-sm ms-1 text-success"></i>
// </div>
// </td>