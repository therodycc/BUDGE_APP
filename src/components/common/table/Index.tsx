import { v4 as gxUUID } from 'uuid';
import { TablePropsI } from '../../../interfaces/common/table/table.interface';
import LoadingPoints from '../loading/loading-points';
import NoDataTable from '../no-data/table-empty';

const Table = ({ headItems, bodyItems }: TablePropsI) => {
    return (
        <>
            <table className="table align-items-center mb-0">
                <thead>
                    <tr>
                        {
                            headItems && headItems?.map((head, index) => (
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" key={gxUUID()}>{head?.title}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {bodyItems?.map((item: any, index: number) => (
                        <tr key={gxUUID()} >
                            {
                                headItems.map((head, index) => (
                                    <td key={gxUUID() + item.key} className='p-3' >
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
                    {bodyItems &&
                        <tr>
                            <td colSpan={12}
                                className="position-relative"
                            >
                                <LoadingPoints />
                            </td>
                        </tr>
                    }
                    {bodyItems?.length === 0 && (<NoDataTable />)}
                </tbody>
            </table>
        </>
    )
}

export default Table

