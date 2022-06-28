import React, { FC } from 'react'
interface THeadPropsI {
    headItems: Array<any>
}
const THead: FC<THeadPropsI> = ({ headItems }) => {
    return (
        <React.Fragment>
            <tr>
                {
                    headItems && headItems?.map((head, index) => (
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" key={`table-head-rows-${index}`}>
                            {head?.headRender ? head.headRender : head?.title}
                        </th>
                    ))
                }
            </tr>
        </React.Fragment>
    )
}

export default THead