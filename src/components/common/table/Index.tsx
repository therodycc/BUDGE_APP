import { TablePropsI } from '../../../interfaces/common/table/table.interface';
import NoDataTable from '../no-data/table-empty';
import LoadingTable from './loading-table';
import TBody from './t-body';
import THead from './t-head';

const Table = ({ headItems, bodyItems }: TablePropsI) => {
    return (
        <>
            <table className="table align-items-center mb-0">
                <thead>
                    <THead headItems={headItems} />
                </thead>
                <tbody>
                    <TBody headItems={headItems} bodyItems={bodyItems} />
                    {!bodyItems && <LoadingTable />}
                    {bodyItems?.length === 0 && (<NoDataTable />)}
                </tbody>
            </table>
        </>
    )
}

export default Table

