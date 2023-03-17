import React, { FC } from 'react'
interface TBodyI {
    headItems: Array<any>
    bodyItems: Array<any> | null
}
const TBody: FC<TBodyI> = ({ headItems, bodyItems }) => {
    return (
        <React.Fragment>
            {bodyItems?.map((item: any, rowIndex: number) => (
                <tr key={`table-body-item-row-${rowIndex}`}>
                    {
                        headItems.map((head, index) => (
                            <td key={`table-body-item-column-${index}`} className='p-3' >
                                {typeof head?.render === "function" && !head?.key && (<head.render item={item} index={rowIndex} />)}
                                {head?.key && (
                                    <p className="text-sm font-weight-normal mb-0">{item[head?.key]}</p>
                                )}

                            </td>
                        ))
                    }
                </tr>
            ))}
        </React.Fragment>
    )
}

export default TBody