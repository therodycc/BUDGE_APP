import { currencyFormat } from "../../../../helpers/currency.helper";
import { StatusType } from "../../../../interfaces/utility/utilily.type";
import ButtonGroup from "../../../common/button/button-group";
import DTProfileTable from "../../../common/dt-profile-table";
import TrafficLights from "../../../common/traffic-lights";
import { ButtonGroupDataManage } from "../buttons-settings";
interface HeadersManageItemsI {
    removeItem: Function
    showModalEdit: Function
}
export const headersManageItems = ({ showModalEdit, removeItem }: HeadersManageItemsI) => [
    {
        title: "Title",
        render: ({ item }: any) => { return (<DTProfileTable name={item?.name} image={item?.img} expense={item?.expense} paidOut={item?.paidOut} category={item?.category} />); },

    },
    {
        title: "Expense",
        render: ({ item }: any) => {
            return (
                <>
                    <span>{currencyFormat(item?.expense)}</span>
                </>
            );
        },
    },
    // { title: "Paid Out", render: ({ item }: any) => { return <PayItemOn /> } },
    {
        title: "Actions",
        render: ({ item }: any) => { return (<TrafficLights status={item.status as StatusType} />); },
    },
    {
        title: "Actions",
        render: ({ item }: any) => {
            return (<ButtonGroup buttonsGroupsData={ButtonGroupDataManage({
                action1: () => showModalEdit(item),
                action2: () => removeItem(item)
            })} />);
        },
    }]